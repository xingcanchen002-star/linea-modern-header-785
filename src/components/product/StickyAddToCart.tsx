import { Loader2 } from "lucide-react";
import { formatShopifyPrice } from "@/lib/shopify";

interface StickyAddToCartProps {
  price: { amount: string; currencyCode: string };
  productTitle: string;
  isLoading: boolean;
  availableForSale: boolean;
  onAddToCart: () => void;
}

const StickyAddToCart = ({ price, productTitle, isLoading, availableForSale, onAddToCart }: StickyAddToCartProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-background border-t border-border px-4 py-3 lg:hidden">
      <div className="flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <p className="font-headline text-sm italic truncate">{productTitle}</p>
          <p className="font-serif-italic text-base text-primary">
            {formatShopifyPrice(price.amount, price.currencyCode)}
          </p>
        </div>
        <button
          onClick={onAddToCart}
          disabled={isLoading || !availableForSale}
          className="flex-shrink-0 px-6 py-3 bg-foreground text-background font-label text-[9px] tracking-[0.25em] uppercase hover:bg-primary transition-all duration-500 disabled:opacity-50 flex items-center gap-2"
        >
          {isLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
          {availableForSale ? "Add to Bag" : "Sold Out"}
        </button>
      </div>
    </div>
  );
};

export default StickyAddToCart;
