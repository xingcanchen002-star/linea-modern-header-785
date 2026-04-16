import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Minus, Plus, Loader2, Heart, ChevronDown } from "lucide-react";
import ReviewProduct from "@/components/product/ReviewProduct";
import MobileImageCarousel from "@/components/product/MobileImageCarousel";
import StickyAddToCart from "@/components/product/StickyAddToCart";
import RelatedProducts from "@/components/product/RelatedProducts";
import ImageZoom from "@/components/product/ImageZoom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { useShopifyProduct } from "@/hooks/useShopifyProducts";
import { useCartStore } from "@/stores/cartStore";
import { useWishlist } from "@/context/WishlistContext";
import { useIsMobile } from "@/hooks/use-mobile";
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ProductDetail = () => {
  const { productId: handle } = useParams();
  const { product, loading, error } = useShopifyProduct(handle);
  const addItem = useCartStore(state => state.addItem);
  const cartIsLoading = useCartStore(state => state.isLoading);
  const { toggleWishlist, isInWishlist } = useWishlist();
  const isMobile = useIsMobile();
  const [quantity, setQuantity] = useState(1);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);

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
        <div className="flex flex-col items-center justify-center py-40 gap-4">
          <p className="text-muted-foreground font-body">Product not found</p>
          <Link to="/" className="font-label text-[10px] tracking-[0.15em] uppercase text-primary hover:underline">
            Continue Shopping
          </Link>
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

      <main className="pb-20 lg:pb-0">
        {/* Breadcrumb */}
        <div className="w-full px-6 md:px-8 max-w-screen-2xl mx-auto pt-4 md:pt-6">
          <nav className="mb-4 md:mb-6 overflow-x-auto">
            <Breadcrumb>
              <BreadcrumbList className="font-label text-[9px] md:text-[10px] tracking-[0.15em] uppercase flex-nowrap">
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
                  <BreadcrumbPage className="truncate max-w-[150px] md:max-w-none">{product.title}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </nav>
        </div>

        {/* Product Section - Shopify Dawn style: images left, info right */}
        <section className="w-full px-0 md:px-8 max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-12">
            {/* Image Gallery */}
            <div>
              {isMobile ? (
                <MobileImageCarousel
                  images={images}
                  productTitle={product.title}
                  onImageClick={(index) => {
                    setCurrentImageIndex(index);
                    setZoomOpen(true);
                  }}
                />
              ) : (
                /* Desktop: stacked images like Shopify Dawn */
                <div className="space-y-2">
                  {images.map((img, index) => (
                    <div
                      key={index}
                      className="aspect-[4/5] bg-secondary overflow-hidden cursor-zoom-in"
                      onClick={() => {
                        setCurrentImageIndex(index);
                        setZoomOpen(true);
                      }}
                    >
                      <img
                        src={img.url}
                        alt={img.altText || `${product.title} - View ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-700"
                        loading={index === 0 ? "eager" : "lazy"}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info - sticky sidebar */}
            <div className="px-6 md:px-0 lg:sticky lg:top-20 lg:h-fit lg:py-6">
              <div className="space-y-6">
                {/* Title & Price */}
                <div className="space-y-3 pt-5 lg:pt-0">
                  {product.productType && (
                    <Link
                      to={`/category/${product.productType.toLowerCase()}`}
                      className="font-label text-[10px] tracking-[0.2em] uppercase text-primary font-bold hover:underline"
                    >
                      {product.productType}
                    </Link>
                  )}
                  <h1 className="font-headline text-2xl md:text-3xl lg:text-4xl italic text-foreground leading-tight">
                    {product.title}
                  </h1>
                  <p className="font-body text-lg md:text-xl text-foreground">
                    {formatShopifyPrice(price.amount, price.currencyCode)}
                  </p>
                </div>

                {/* Variant selection */}
                {product.options && product.options.length > 0 && product.options[0].name !== 'Title' && (
                  <div className="space-y-4 pt-2">
                    {product.options.map((option) => (
                      <div key={option.name}>
                        <span className="font-label text-[10px] tracking-[0.15em] uppercase text-muted-foreground block mb-2.5">
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
                                className={cn(
                                  "min-w-[48px] px-4 py-2.5 border text-sm transition-all",
                                  isSelected
                                    ? 'border-foreground bg-foreground text-background'
                                    : 'border-border text-foreground hover:border-foreground'
                                )}
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

                {/* Quantity */}
                <div className="space-y-2.5">
                  <span className="font-label text-[10px] tracking-[0.15em] uppercase text-muted-foreground">Quantity</span>
                  <div className="flex items-center border border-border w-fit">
                    <Button variant="ghost" size="sm" onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      className="h-11 w-11 p-0 hover:bg-transparent hover:opacity-50 rounded-none border-none">
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="h-11 flex items-center px-4 text-sm font-body min-w-[48px] justify-center border-l border-r border-border">
                      {quantity}
                    </span>
                    <Button variant="ghost" size="sm" onClick={() => setQuantity(q => q + 1)}
                      className="h-11 w-11 p-0 hover:bg-transparent hover:opacity-50 rounded-none border-none">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Add to Cart + Wishlist */}
                <div className="space-y-3 pt-1">
                  <button
                    onClick={handleAddToCart}
                    disabled={cartIsLoading || !selectedVariant?.availableForSale}
                    className="w-full py-4 bg-foreground text-background font-label text-[10px] tracking-[0.3em] uppercase hover:bg-primary transition-all duration-500 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {cartIsLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                    {selectedVariant?.availableForSale ? 'Add to Bag' : 'Sold Out'}
                  </button>

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
                        : "border-border text-foreground hover:border-foreground"
                    )}
                  >
                    <Heart className={cn("w-4 h-4", handle && isInWishlist(handle) && "fill-current")} />
                    {handle && isInWishlist(handle) ? "In Wishlist" : "Add to Wishlist"}
                  </button>
                </div>

                {/* Accordion details - Shopify Dawn style */}
                <Accordion type="multiple" defaultValue={["description"]} className="border-t border-border">
                  {product.description && (
                    <AccordionItem value="description" className="border-b border-border">
                      <AccordionTrigger className="py-5 hover:no-underline">
                        <span className="font-label text-[10px] tracking-[0.15em] uppercase font-bold">Description</span>
                      </AccordionTrigger>
                      <AccordionContent className="pb-6">
                        <p className="font-body text-sm text-muted-foreground leading-relaxed">{product.description}</p>
                      </AccordionContent>
                    </AccordionItem>
                  )}

                  <AccordionItem value="shipping" className="border-b border-border">
                    <AccordionTrigger className="py-5 hover:no-underline">
                      <span className="font-label text-[10px] tracking-[0.15em] uppercase font-bold">Shipping & Returns</span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-6">
                      <div className="font-body text-sm text-muted-foreground leading-relaxed space-y-3">
                        <p>Complimentary insured shipping on all orders. Each piece is carefully packaged in our signature gift box.</p>
                        <p>We offer a 30-day return policy. Items must be unworn and in original packaging.</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="care" className="border-b border-border">
                    <AccordionTrigger className="py-5 hover:no-underline">
                      <span className="font-label text-[10px] tracking-[0.15em] uppercase font-bold">Care Instructions</span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-6">
                      <div className="font-body text-sm text-muted-foreground leading-relaxed space-y-3">
                        <p>Store in the provided jewelry box when not wearing. Avoid contact with perfumes, lotions, and harsh chemicals.</p>
                        <p>Clean gently with a soft cloth. All pieces come with a lifetime warranty against manufacturing defects.</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="reviews" className="border-b border-border">
                    <AccordionTrigger className="py-5 hover:no-underline">
                      <span className="font-label text-[10px] tracking-[0.15em] uppercase font-bold">Reviews</span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-6">
                      <ReviewProduct productHandle={product.handle} productTitle={product.title} />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>
        </section>

        {/* Related Products */}
        <RelatedProducts currentHandle={product.handle} productType={product.productType} />
      </main>

      {/* Sticky mobile bottom CTA */}
      {selectedVariant && (
        <StickyAddToCart
          price={price}
          productTitle={product.title}
          isLoading={cartIsLoading}
          availableForSale={selectedVariant.availableForSale}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* Image Zoom Modal */}
      <ImageZoom
        images={images.map(img => img.url)}
        initialIndex={currentImageIndex}
        isOpen={zoomOpen}
        onClose={() => setZoomOpen(false)}
      />

      <Footer />
    </div>
  );
};

export default ProductDetail;
