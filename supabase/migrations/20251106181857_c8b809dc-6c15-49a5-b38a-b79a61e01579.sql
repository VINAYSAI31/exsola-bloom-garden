-- Create blogs table
CREATE TABLE IF NOT EXISTS public.blogs (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  content text NOT NULL,
  image_url text,
  read_time text NOT NULL DEFAULT '5 minute read',
  category text NOT NULL DEFAULT 'research',
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view blogs
CREATE POLICY "Anyone can view blogs"
  ON public.blogs
  FOR SELECT
  USING (true);

-- Allow admins to manage blogs
CREATE POLICY "Admins can manage blogs"
  ON public.blogs
  FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for updated_at
CREATE TRIGGER update_blogs_updated_at
  BEFORE UPDATE ON public.blogs
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();