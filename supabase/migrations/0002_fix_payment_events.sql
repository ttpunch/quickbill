-- Drop and recreate payment_events cleanly
DROP TABLE IF EXISTS payment_events;

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

ALTER TABLE payment_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own payment events" ON payment_events FOR SELECT USING (auth.uid() = user_id);
