-- User-submitted questions / support requests.
-- Admin reads these via the service-role client (bypasses RLS); users may
-- only see and create their own.
CREATE TABLE IF NOT EXISTS public.questions (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  subject     text,
  message     text NOT NULL,
  status      text NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'answered', 'closed')),
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_questions_user_id ON public.questions(user_id);
CREATE INDEX IF NOT EXISTS idx_questions_created_at ON public.questions(created_at);
CREATE INDEX IF NOT EXISTS idx_questions_status ON public.questions(status);

ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS questions_select_own ON public.questions;
CREATE POLICY questions_select_own ON public.questions
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS questions_insert_own ON public.questions;
CREATE POLICY questions_insert_own ON public.questions
  FOR INSERT WITH CHECK (auth.uid() = user_id);
