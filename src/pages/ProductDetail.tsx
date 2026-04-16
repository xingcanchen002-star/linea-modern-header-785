import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShieldCheck, Truck, RotateCcw, Minus, Plus, Loader2, Heart } from "lucide-react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { useShopifyProduct } from "@/hooks/useShopifyProducts";
import { useCartStore } from "@/stores/cartStore";
import { useWishlist } from "@/context/WishlistContext";
import { formatShopifyPrice } from "@/lib/shopify";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const ProductDetail = () => {
  const { productId: handle } = useParams();
  const { product, loading, error } = useShopifyProduct(handle);
  const addItem = useCartStore(state => state.addItem);
  const cartIsLoading = useCartStore(state => state.isLoading);
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex justify-center items-center py-40">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex justify-center items-center py-40">
          <p className="text-muted-foreground">Product not found</p>
        </div>
        <Footer />
      </div>
    );
  }

  const images = product.images.edges.map(e => e.node);
  const variants = product.variants.edges.map(e => e.node);
  const selectedVariant = variants[selectedVariantIndex];
  const price = selectedVariant?.price || product.priceRange.minVariantPrice;

  const handleAddToCart = async () => {
    if (!selectedVariant) return;
    await addItem({
      product: { node: product },
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity,
      selectedOptions: selectedVariant.selectedOptions || [],
    });
    toast.success("Added to bag", {
      description: `${quantity}× ${product.title} added to your shopping bag.`,
    });
    setQuantity(1);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-6">
        <section className="w-full px-6 md:px-8 max-w-screen-2xl mx-auto">
          <nav className="mb-6">
            <Breadcrumb>
              <BreadcrumbList className="font-label text-[10px] tracking-[0.15em] uppercase">
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to={`/category/${product.productType?.toLowerCase() || 'shop'}`} className="hover:text-primary transition-colors">
                      {product.productType || 'Shop'}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{product.title}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
            {/* Image Gallery */}
            <div className="lg:col-span-7">
              <div className="space-y-4">
                {/* Main image */}
                <div className="aspect-[4/5] bg-secondary overflow-hidden">
                  {images[currentImageIndex] && (
                    <img
                      src={images[currentImageIndex].url}
                      alt={images[currentImageIndex].altText || product.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                {/* Thumbnails */}
                {images.length > 1 && (
                  <div className="grid grid-cols-4 gap-4">
                    {images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`aspect-square bg-secondary overflow-hidden transition-all ${
                          index === currentImageIndex ? "ring-2 ring-primary" : "opacity-60 hover:opacity-100"
                        }`}
                      >
                        <img src={img.url} alt={img.altText || ''} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div className="lg:col-span-5 lg:sticky lg:top-24 lg:h-fit space-y-8">
              <div className="space-y-3">
                <span className="font-label text-[10px] tracking-[0.2em] uppercase text-primary font-bold">
                  {product.productType || 'Collection'}
                </span>
                <h1 className="font-headline text-3xl md:text-4xl italic text-foreground">{product.title}</h1>
                <p className="font-serif-italic text-2xl text-primary">
                  {formatShopifyPrice(price.amount, price.currencyCode)}
                </p>
              </div>

              {/* Variant selection */}
              {product.options && product.options.length > 0 && product.options[0].name !== 'Title' && (
                <div className="space-y-4 py-6 border-y border-border">
                  {product.options.map((option) => (
                    <div key={option.name}>
                      <span className="font-label text-[10px] tracking-[0.15em] uppercase text-muted-foreground block mb-3">
                        {option.name}
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {option.values.map((value) => {
                          const variantIndex = variants.findIndex(v =>
                            v.selectedOptions.some(o => o.name === option.name && o.value === value)
                          );
                          const isSelected = selectedVariant?.selectedOptions.some(
                            o => o.name === option.name && o.value === value
                          );
                          return (
                            <button
                              key={value}
                              onClick={() => variantIndex >= 0 && setSelectedVariantIndex(variantIndex)}
                              className={`px-4 py-2 border text-sm transition-all ${
                                isSelected
                                  ? 'border-primary bg-primary/5 text-primary'
                                  : 'border-border text-foreground hover:border-primary'
                              }`}
                            >
                              {value}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Quantity and Add to Cart */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="font-label text-[10px] tracking-[0.15em] uppercase text-muted-foreground">Quantity</span>
                  <div className="flex items-center border border-border">
                    <Button variant="ghost" size="sm" onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      className="h-10 w-10 p-0 hover:bg-transparent hover:opacity-50 rounded-none border-none">
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="h-10 flex items-center px-4 text-sm font-body min-w-12 justify-center border-l border-r border-border">
                      {quantity}
                    </span>
                    <Button variant="ghost" size="sm" onClick={() => setQuantity(q => q + 1)}
                      className="h-10 w-10 p-0 hover:bg-transparent hover:opacity-50 rounded-none border-none">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={cartIsLoading || !selectedVariant?.availableForSale}
                  className="w-full py-4 bg-foreground text-background font-label text-[10px] tracking-[0.3em] uppercase hover:bg-primary transition-all duration-500 shadow-xl shadow-foreground/5 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {cartIsLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                  {selectedVariant?.availableForSale ? 'Add to Selection' : 'Sold Out'}
                </button>

                {/* Wishlist */}
                <button
                  onClick={() => {
                    if (!handle) return;
                    const wasInWishlist = isInWishlist(handle);
                    toggleWishlist(handle);
                    toast(wasInWishlist ? "Removed from favorites" : "Added to favorites", {
                      description: wasInWishlist
                        ? `${product.title} removed from your favorites.`
                        : `${product.title} added to your favorites.`,
                    });
                  }}
                  className={cn(
                    "w-full py-3.5 border flex items-center justify-center gap-2 font-label text-[10px] tracking-[0.15em] uppercase transition-all",
                    handle && isInWishlist(handle)
                      ? "bg-primary/5 border-primary text-primary"
                      : "border-border text-foreground hover:bg-secondary"
                  )}
                >
                  <Heart className={cn("w-4 h-4", handle && isInWishlist(handle) && "fill-current")} />
                  {handle && isInWishlist(handle) ? "In Wishlist" : "Wishlist"}
                </button>
              </div>

              {/* Value Props */}
              <div className="grid grid-cols-3 gap-4 py-8 border-y border-border">
                <div className="text-center space-y-2">
                  <ShieldCheck className="w-5 h-5 mx-auto text-primary" />
                  <p className="font-label text-[8px] tracking-[0.15em] uppercase text-muted-foreground">Lifetime Warranty</p>
                </div>
                <div className="text-center space-y-2">
                  <Truck className="w-5 h-5 mx-auto text-primary" />
                  <p className="font-label text-[8px] tracking-[0.15em] uppercase text-muted-foreground">Insured Shipping</p>
                </div>
                <div className="text-center space-y-2">
                  <RotateCcw className="w-5 h-5 mx-auto text-primary" />
                  <p className="font-label text-[8px] tracking-[0.15em] uppercase text-muted-foreground">30-Day Returns</p>
                </div>
              </div>

              {/* Description */}
              {product.description && (
                <div className="space-y-4">
                  <h3 className="font-label text-[10px] tracking-[0.2em] uppercase text-foreground font-bold">Description</h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">{product.description}</p>
                </div>
              )}

              {/* Reviews */}
              <ReviewProduct productHandle={product.handle} productTitle={product.title} />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
