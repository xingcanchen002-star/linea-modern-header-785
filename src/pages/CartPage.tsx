import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, Loader2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { useCartStore } from "@/stores/cartStore";
import { formatShopifyPrice } from "@/lib/shopify";

const CartPage = () => {
  const items = useCartStore(state => state.items);
  const updateQuantity = useCartStore(state => state.updateQuantity);
  const removeItem = useCartStore(state => state.removeItem);
  const isLoading = useCartStore(state => state.isLoading);
  const getCheckoutUrl = useCartStore(state => state.getCheckoutUrl);
  const itemCount = useCartStore(state => state.itemCount)();
  const subtotal = useCartStore(state => state.subtotal)();

  const handleCheckout = () => {
    const checkoutUrl = getCheckoutUrl();
    if (checkoutUrl) {
      window.open(checkoutUrl, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-4 md:pt-6 px-4 md:px-6 pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="py-6 md:py-12 text-center">
            <h1 className="text-2xl md:text-4xl font-light text-foreground mb-1">Your Shopping Bag</h1>
            <p className="text-xs md:text-sm font-light text-muted-foreground">
              {itemCount} {itemCount === 1 ? "item" : "items"}
            </p>
          </div>

          {items.length === 0 ? (
            <div className="text-center py-12 md:py-20 space-y-5">
              <p className="text-muted-foreground text-sm font-light">Your shopping bag is currently empty.</p>
              <Button asChild className="rounded-none h-11 md:h-12 px-8 md:px-10 bg-foreground text-background hover:bg-foreground/90 font-light text-xs md:text-sm">
                <Link to="/category/shop">Explore Collection</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-8 space-y-0">
                {items.map((item) => {
                  const image = item.product.node.images?.edges?.[0]?.node;
                  const currencyCode = item.price.currencyCode;
                  const totalAmount = (parseFloat(item.price.amount) * item.quantity).toFixed(2);

                  return (
                    <div key={item.variantId} className="flex gap-6 py-8 border-b border-border">
                      <Link to={`/product/${item.product.node.handle}`} className="w-28 h-28 md:w-36 md:h-36 bg-muted/10 overflow-hidden flex-shrink-0">
                        {image && <img src={image.url} alt={item.product.node.title} className="w-full h-full object-cover" />}
                      </Link>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-sm font-light text-muted-foreground">{item.product.node.productType}</p>
                              <h3 className="text-base font-medium text-foreground">{item.product.node.title}</h3>
                              {item.variantTitle !== 'Default Title' && (
                                <p className="text-xs font-light text-muted-foreground mt-1">{item.variantTitle}</p>
                              )}
                            </div>
                            <button onClick={() => removeItem(item.variantId)} disabled={isLoading}
                              className="p-2 text-muted-foreground hover:text-destructive transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <div className="flex justify-between items-end mt-4">
                          <div className="flex items-center border border-border">
                            <button onClick={() => updateQuantity(item.variantId, item.quantity - 1)} disabled={isLoading}
                              className="p-2 hover:bg-muted/50 transition-colors">
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-4 text-sm font-light min-w-[40px] text-center">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.variantId, item.quantity + 1)} disabled={isLoading}
                              className="p-2 hover:bg-muted/50 transition-colors">
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <p className="text-base font-light text-foreground">
                            {formatShopifyPrice(totalAmount, currencyCode)}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="lg:col-span-4">
                <div className="bg-muted/20 p-8 space-y-6 sticky top-24">
                  <h3 className="text-lg font-light text-foreground">Order Summary</h3>
                  <div className="space-y-3 text-sm font-light">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Subtotal</span>
                      <span>{formatShopifyPrice(subtotal.toFixed(2), items[0]?.price.currencyCode || 'USD')}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Shipping</span>
                      <span className="text-xs uppercase tracking-wider">Calculated at checkout</span>
                    </div>
                    <div className="pt-4 border-t border-border flex justify-between text-foreground font-medium">
                      <span>Total</span>
                      <span className="text-lg">{formatShopifyPrice(subtotal.toFixed(2), items[0]?.price.currencyCode || 'USD')}</span>
                    </div>
                  </div>
                  <Button onClick={handleCheckout} disabled={isLoading}
                    className="w-full h-12 rounded-none bg-foreground text-background hover:bg-foreground/90 font-light">
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <ExternalLink className="w-4 h-4 mr-2" />}
                    Checkout with Shopify
                  </Button>
                  <Button variant="outline" asChild className="w-full h-12 rounded-none font-light">
                    <Link to="/category/shop">Continue Shopping</Link>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;
