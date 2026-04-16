import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { useWishlist } from "@/context/WishlistContext";

const WishlistPage = () => {
  const { wishlist, toggleWishlist } = useWishlist();

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

          {wishlist.length === 0 ? (
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
            <div className="text-center py-20 space-y-6">
              <p className="text-muted-foreground text-sm font-light">
                You have {wishlist.length} item{wishlist.length !== 1 ? 's' : ''} saved. Browse our collection to view them.
              </p>
              <Button asChild className="rounded-none h-12 px-10 bg-foreground text-background hover:bg-foreground/90 font-light">
                <Link to="/category/shop">Browse Collection</Link>
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default WishlistPage;
