-- Onboarding gate
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS onboarded_at timestamptz;

-- Reminder tracking on invoices
ALTER TABLE public.invoices ADD COLUMN IF NOT EXISTS last_reminder_sent_at timestamptz;
ALTER TABLE public.invoices ADD COLUMN IF NOT EXISTS reminder_count integer NOT NULL DEFAULT 0;

-- Saved clients
CREATE TABLE IF NOT EXISTS public.clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text,
  gstin text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz
);

ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS clients_select_own ON public.clients;
CREATE POLICY clients_select_own ON public.clients FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS clients_insert_own ON public.clients;
CREATE POLICY clients_insert_own ON public.clients FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS clients_update_own ON public.clients;
CREATE POLICY clients_update_own ON public.clients FOR UPDATE USING (auth.uid() = user_id);

-- One active client per (user, name) so we can upsert/dedup on auto-save
CREATE UNIQUE INDEX IF NOT EXISTS clients_user_name_uniq
  ON public.clients (user_id, lower(name)) WHERE deleted_at IS NULL;
