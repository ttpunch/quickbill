INSERT INTO subscription_plans (name, slug, price_inr_paise, interval, invoice_limit) VALUES
  ('Free',       'free',       0,      'monthly', 5),
  ('Pro',        'pro',        29900,  'monthly', NULL),
  ('Pro Annual', 'pro-annual', 249900, 'yearly',  NULL)
ON CONFLICT (slug) DO NOTHING;
