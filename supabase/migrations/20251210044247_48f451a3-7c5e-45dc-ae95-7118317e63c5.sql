-- Add policy for admins to view all cart items
CREATE POLICY "Admins can view all cart items" 
ON public.cart_items 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));