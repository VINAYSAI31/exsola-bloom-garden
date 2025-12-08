-- Allow users to update their own orders (required for payment status updates)
CREATE POLICY "Users can update their own orders"
ON public.orders
FOR UPDATE
USING (auth.uid() = user_id);
