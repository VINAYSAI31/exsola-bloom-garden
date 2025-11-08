-- Create workshops table
CREATE TABLE public.workshops (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  duration TEXT NOT NULL,
  format TEXT NOT NULL,
  learning_points TEXT[] NOT NULL,
  take_home TEXT NOT NULL,
  best_for TEXT NOT NULL,
  price NUMERIC NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.workshops ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Anyone can view workshops" 
ON public.workshops 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can manage workshops" 
ON public.workshops 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Trigger for updated_at
CREATE TRIGGER update_workshops_updated_at
BEFORE UPDATE ON public.workshops
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();