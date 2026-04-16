import { Link } from "react-router-dom";
import { Heart, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { useWishlist } from "@/context/WishlistContext";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import { formatShopifyPrice } from "@/lib/shopify";

const WishlistPage = () => {
  const { wishlist, toggleWishlist } = useWishlist();
  const { products, loading } = useShopifyProducts(100);

  const wishlistProducts = products.filter((p) =>
    wishlist.includes(p.node.handle)
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-6 px-6 pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="py-12 text-center">
            <h1 className="text-3xl md:text-4xl font-light text-foreground mb-2">Your Favorites</h1>
            <p className="text-sm font-light text-muted-foreground">
              {wishlist.length} {wishlist.length === 1 ? "piece" : "pieces"} saved
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            </div>
          ) : wishlist.length === 0 ? (
            <div className="text-center py-20 space-y-6">
              <div className="w-16 h-16 mx-auto rounded-full bg-muted/30 flex items-center justify-center">
                <Heart className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-sm font-light">
                Your wishlist is currently empty.<br />
                Explore our collections to find pieces you love.
              </p>
              <Button asChild className="rounded-none h-12 px-10 bg-foreground text-background hover:bg-foreground/90 font-light">
                <Link to="/category/shop">Explore Collection</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {wishlistProducts.map((product) => {
                const { node } = product;
                const image = node.images?.edges?.[0]?.node;
                const price = node.priceRange.minVariantPrice;

                return (
                  <div key={node.handle} className="group relative">
                    <button
                      onClick={() => toggleWishlist(node.handle)}
                      className="absolute top-3 right-3 z-10 p-2 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background transition-colors"
                      aria-label="Remove from favorites"
                    >
                      <X className="w-4 h-4 text-foreground" />
                    </button>
                    <Link to={`/product/${node.handle}`}>
                      <div className="aspect-square bg-muted/10 overflow-hidden mb-3">
                        {image && (
                          <img
                            src={image.url}
                            alt={image.altText || node.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        )}
                      </div>
                      <p className="text-xs font-light text-muted-foreground uppercase tracking-wider mb-1">
                        {node.productType}
                      </p>
                      <h3 className="text-sm font-medium text-foreground mb-1">{node.title}</h3>
                      <p className="text-sm font-light text-foreground">
                        {formatShopifyPrice(price.amount, price.currencyCode)}
                      </p>
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default WishlistPage;
