-- Allow users to insert their own order items
-- The previous policy only allowed SELECT. We need INSERT policy.

CREATE POLICY "Users can insert their own order items"
ON public.order_items
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.orders
    WHERE orders.id = order_items.order_id
    AND orders.user_id = auth.uid()
  )
);
