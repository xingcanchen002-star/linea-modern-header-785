import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const Star = ({ filled, onClick, className }: { filled: boolean; onClick?: () => void; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className={`w-4 h-4 ${onClick ? 'cursor-pointer' : ''} ${filled ? 'text-primary' : 'text-muted-foreground/20'} ${className}`}
    onClick={onClick}
  >
    <path
      fillRule="evenodd"
      d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z"
      clipRule="evenodd"
    />
  </svg>
);

interface Review {
  id: string;
  rating: number;
  reviewer_name: string;
  review_text: string | null;
  created_at: string;
}

interface ReviewProductProps {
  productHandle: string;
  productTitle: string;
}

const ReviewProduct = ({ productHandle, productTitle }: ReviewProductProps) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewerName, setReviewerName] = useState("");
  const [reviewText, setReviewText] = useState("");

  const fetchReviews = async () => {
    const { data, error } = await supabase
      .from("product_reviews")
      .select("*")
      .eq("product_handle", productHandle)
      .order("created_at", { ascending: false });
    if (!error && data) setReviews(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchReviews();
  }, [productHandle]);

  const avgRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  const submitReview = async () => {
    if (rating === 0 || !reviewerName.trim()) return;
    setSubmitting(true);
    const { error } = await supabase.from("product_reviews").insert({
      product_handle: productHandle,
      rating,
      reviewer_name: reviewerName.trim().slice(0, 100),
      review_text: reviewText.trim().slice(0, 1000) || null,
    });
    setSubmitting(false);
    if (error) {
      toast.error("Failed to submit review");
      return;
    }
    toast.success("Review submitted", { description: `Thank you for reviewing ${productTitle}.` });
    setIsOpen(false);
    setRating(0);
    setReviewerName("");
    setReviewText("");
    fetchReviews();
  };

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-label text-[10px] tracking-[0.2em] uppercase text-foreground font-bold">
            Reviews {reviews.length > 0 && `(${reviews.length})`}
          </h3>
          {reviews.length > 0 && (
            <div className="flex items-center gap-2 mt-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map(s => <Star key={s} filled={s <= Math.round(avgRating)} />)}
              </div>
              <span className="text-xs text-muted-foreground font-light">{avgRating.toFixed(1)}</span>
            </div>
          )}
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="rounded-none font-label text-[9px] tracking-[0.15em] uppercase h-9">
              Write a Review
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md !rounded-none">
            <DialogHeader>
              <DialogTitle className="font-light text-xl">Review {productTitle}</DialogTitle>
            </DialogHeader>
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-light text-foreground">Rating</label>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map(s => (
                    <Star key={s} filled={s <= rating} onClick={() => setRating(s)} className="!w-6 !h-6" />
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-light text-foreground">Name</label>
                <Input
                  value={reviewerName}
                  onChange={e => setReviewerName(e.target.value)}
                  placeholder="Your name"
                  maxLength={100}
                  className="rounded-none font-light"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-light text-foreground">Review (optional)</label>
                <Textarea
                  value={reviewText}
                  onChange={e => setReviewText(e.target.value)}
                  placeholder="Share your thoughts..."
                  maxLength={1000}
                  className="min-h-24 resize-none rounded-none font-light"
                />
              </div>
              <Button
                onClick={submitReview}
                disabled={rating === 0 || !reviewerName.trim() || submitting}
                className="w-full h-12 bg-foreground text-background hover:bg-foreground/90 font-light rounded-none"
              >
                {submitting && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                Submit Review
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Review list */}
      {loading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
        </div>
      ) : reviews.length === 0 ? (
        <p className="text-sm text-muted-foreground font-light py-4">No reviews yet. Be the first to share your experience.</p>
      ) : (
        <div className="space-y-6 divide-y divide-border">
          {reviews.map(review => (
            <div key={review.id} className="pt-6 first:pt-0 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map(s => <Star key={s} filled={s <= review.rating} className="!w-3.5 !h-3.5" />)}
                  </div>
                  <span className="text-sm font-medium text-foreground">{review.reviewer_name}</span>
                </div>
                <span className="text-xs text-muted-foreground font-light">
                  {new Date(review.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
              {review.review_text && (
                <p className="text-sm text-muted-foreground font-light leading-relaxed">{review.review_text}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewProduct;
