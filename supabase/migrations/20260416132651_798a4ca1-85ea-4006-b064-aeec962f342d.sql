
DROP POLICY "Anyone can submit a review" ON public.product_reviews;
CREATE POLICY "Anyone can submit a review"
  ON public.product_reviews FOR INSERT
  WITH CHECK (verified_purchase = false);
