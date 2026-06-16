-- Drop all tables in correct order (reverse dependency)
DROP TABLE IF EXISTS audit_logs CASCADE;
DROP TABLE IF EXISTS payment_events CASCADE;
DROP TABLE IF EXISTS invoice_items CASCADE;
DROP TABLE IF EXISTS invoices CASCADE;
DROP TABLE IF EXISTS subscriptions CASCADE;
DROP TABLE IF EXISTS subscription_plans CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Users
CREATE TABLE users (
  id                    UUID PRIMARY KEY,
  email                 TEXT NOT NULL UNIQUE,
  name                  TEXT,
  business_name         TEXT,
  gst_number            TEXT,
  upi_id                TEXT,
  logo_url              TEXT,
  invoice_count         INTEGER NOT NULL DEFAULT 0,
  consent_given_at      TIMESTAMPTZ,
  consent_version       TEXT,
  deletion_requested_at TIMESTAMPTZ,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at            TIMESTAMPTZ
);
CREATE INDEX idx_users_email ON users(email);

-- Subscription plans
CREATE TABLE subscription_plans (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name             TEXT NOT NULL,
  slug             TEXT NOT NULL UNIQUE,
  price_inr_paise  INTEGER NOT NULL,
  interval         TEXT NOT NULL CHECK (interval IN ('monthly', 'yearly')),
  invoice_limit    INTEGER,
  is_active        BOOLEAN NOT NULL DEFAULT true,
  razorpay_plan_id TEXT,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Subscriptions
CREATE TABLE subscriptions (
  id                       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id                  UUID NOT NULL REFERENCES users(id),
  plan_id                  UUID NOT NULL REFERENCES subscription_plans(id),
  status                   TEXT NOT NULL CHECK (status IN ('active', 'past_due', 'cancelled', 'expired')),
  current_period_start     TIMESTAMPTZ NOT NULL,
  current_period_end       TIMESTAMPTZ NOT NULL,
  cancel_at_period_end     BOOLEAN NOT NULL DEFAULT false,
  razorpay_subscription_id TEXT UNIQUE,
  cancelled_at             TIMESTAMPTZ,
  created_at               TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at               TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);

-- Invoices
CREATE TABLE invoices (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES users(id),
  invoice_number  TEXT NOT NULL,
  client_name     TEXT NOT NULL,
  client_email    TEXT,
  client_gstin    TEXT,
  status          TEXT NOT NULL DEFAULT 'unpaid' CHECK (status IN ('draft','unpaid','paid','overdue')),
  subtotal_paise  INTEGER NOT NULL,
  gst_rate        NUMERIC(4,1) NOT NULL,
  cgst_paise      INTEGER NOT NULL,
  sgst_paise      INTEGER NOT NULL,
  total_paise     INTEGER NOT NULL,
  pdf_url         TEXT,
  due_date        DATE,
  paid_at         TIMESTAMPTZ,
  notes           TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at      TIMESTAMPTZ
);
CREATE UNIQUE INDEX idx_invoices_user_number ON invoices(user_id, invoice_number);
CREATE INDEX idx_invoices_user_id ON invoices(user_id);
CREATE INDEX idx_invoices_status ON invoices(status);

-- Invoice items
CREATE TABLE invoice_items (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id   UUID NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
  description  TEXT NOT NULL,
  quantity     NUMERIC(10,2) NOT NULL DEFAULT 1,
  rate_paise   INTEGER NOT NULL,
  amount_paise INTEGER NOT NULL,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_invoice_items_invoice_id ON invoice_items(invoice_id);

-- Payment events (immutable log)
CREATE TABLE payment_events (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id          UUID REFERENCES users(id),
  subscription_id  UUID REFERENCES subscriptions(id),
  event_type       TEXT NOT NULL,
  amount_inr_paise INTEGER,
  gateway          TEXT NOT NULL DEFAULT 'razorpay',
  gateway_event_id TEXT UNIQUE,
  payload          JSONB NOT NULL DEFAULT '{}',
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_payment_events_user_id ON payment_events(user_id);
CREATE INDEX idx_payment_events_gateway_event_id ON payment_events(gateway_event_id);

-- Audit logs
CREATE TABLE audit_logs (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id    UUID REFERENCES users(id),
  action      TEXT NOT NULL,
  resource    TEXT NOT NULL,
  resource_id UUID,
  ip_address  INET,
  metadata    JSONB DEFAULT '{}',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_audit_logs_actor_id ON audit_logs(actor_id);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);

-- Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoice_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users_own" ON users FOR ALL USING (auth.uid() = id);
CREATE POLICY "invoices_own" ON invoices FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "invoice_items_own" ON invoice_items FOR ALL
  USING (invoice_id IN (SELECT id FROM invoices WHERE user_id = auth.uid()));
CREATE POLICY "subscriptions_own" ON subscriptions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "payment_events_own" ON payment_events FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "audit_logs_own" ON audit_logs FOR SELECT USING (auth.uid() = actor_id);

-- Seed plans
INSERT INTO subscription_plans (name, slug, price_inr_paise, interval, invoice_limit) VALUES
  ('Free',       'free',       0,      'monthly', 5),
  ('Pro',        'pro',        29900,  'monthly', NULL),
  ('Pro Annual', 'pro-annual', 249900, 'yearly',  NULL)
ON CONFLICT (slug) DO NOTHING;
