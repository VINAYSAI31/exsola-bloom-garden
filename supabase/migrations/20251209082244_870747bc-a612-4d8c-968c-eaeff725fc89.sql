-- Create store_settings table to store shipping charges and other settings
CREATE TABLE public.store_settings (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key text NOT NULL UNIQUE,
  value text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.store_settings ENABLE ROW LEVEL SECURITY;

-- Anyone can view settings (needed for checkout)
CREATE POLICY "Anyone can view store settings"
ON public.store_settings
FOR SELECT
USING (true);

-- Only admins can manage settings
CREATE POLICY "Admins can manage store settings"
ON public.store_settings
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Insert default shipping charge
INSERT INTO public.store_settings (key, value) VALUES ('shipping_charge', '49');
INSERT INTO public.store_settings (key, value) VALUES ('free_shipping_threshold', '500');