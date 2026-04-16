import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Heart, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import { useCartStore } from "@/stores/cartStore";
import { formatShopifyPrice } from "@/lib/shopify";
import { toast } from "sonner";

import earringsCollection from "@/assets/earrings-collection.webp";
import linkBracelet from "@/assets/link-bracelet.webp";
import heroImage from "@/assets/hero-image.webp";
import circularCollection from "@/assets/circular-collection.webp";
import artisanCraftsmanship from "@/assets/artisan-craftsmanship.jpg";
import foundersPortrait from "@/assets/founders-portrait.jpg";

const collectionStories = [
  "A timeless dialogue between heritage gold and the clarity of sustainable diamonds. Designed for those who seek beauty in permanence.",
  "Jewelry is the ultimate expression of personal narrative, where every gemstone whispers a story of light and shadow. It is the silent language of elegance.",
  "The true essence of luxury lies in the harmony of form and function, where jewelry becomes a canvas for the soul's deepest aspirations.",
  "Aesthetics in fine jewelry transcend the visual, touching the very spirit of the wearer. An exploration of symmetry and a celebration of the rare.",
];

const Index = () => {
  const { products, loading } = useShopifyProducts(4);
  const addItem = useCartStore(state => state.addItem);
  const isLoading = useCartStore(state => state.isLoading);
  const [storyIndex, setStoryIndex] = useState(0);
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const nextStory = () => setStoryIndex((prev) => (prev + 1) % collectionStories.length);
  const prevStory = () => setStoryIndex((prev) => (prev - 1 + collectionStories.length) % collectionStories.length);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* ═══════════════════════ Cinematic Hero ═══════════════════════ */}
        <section className="relative h-[70vh] md:h-[921px] overflow-hidden flex items-center bg-secondary">
          <motion.div
            className="absolute inset-0 z-0"
            initial={{ scale: 1.15, opacity: 0 }}
            animate={{ scale: 1.05, opacity: 1 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
          >
            <img className="w-full h-full object-cover object-center" src={heroImage} alt="ORLISSE hero" />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/40 via-foreground/15 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent z-10" />

          <div className="relative z-20 max-w-screen-2xl mx-auto px-6 md:px-8 w-full">
            <div className="max-w-2xl">
              <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
                className="font-label text-primary font-medium tracking-[0.3em] uppercase text-[10px] md:text-xs mb-4 md:mb-6 block">
                The New Era of Opulence
              </motion.span>
              <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }}
                className="font-headline text-4xl md:text-8xl text-white leading-[1.05] mb-6 md:mb-8 font-light italic">
                Artistry in <br />
                <motion.span initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.9 }} className="md:pl-20 inline-block">
                  Every Facet
                </motion.span>
              </motion.h1>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.2 }}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <Link to="/category/shop"
                  className="inline-block bg-primary text-primary-foreground px-8 md:px-10 py-4 font-label text-xs md:text-sm tracking-[0.3em] uppercase hover:bg-primary/90 transition-all shadow-xl shadow-primary/10">
                  Explore Collections
                </Link>
                <Link to="/about/our-story"
                  className="inline-flex items-center gap-2 text-white border-b border-white/30 pb-1 font-label text-xs tracking-[0.2em] uppercase hover:border-primary transition-all">
                  Our Story <ArrowRight className="w-3 h-3" />
                </Link>
              </motion.div>
            </div>
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
            <span className="font-label text-[8px] tracking-[0.3em] uppercase text-white/60">Scroll to explore</span>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="w-px h-8 bg-gradient-to-b from-white/60 to-transparent" />
          </motion.div>
        </section>

        {/* ═══════════════════════ The Eternal Collection ═══════════════════════ */}
        <section className="py-24 md:py-32 px-6 md:px-8 bg-background">
          <div className="max-w-screen-2xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-20 gap-8">
              <div className="max-w-xl">
                <h2 className="font-headline text-3xl md:text-5xl font-light italic mb-6">The Eternal Collection</h2>
                <div className="h-[120px] md:h-[100px]">
                  <AnimatePresence mode="wait">
                    <motion.p key={storyIndex} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.5, ease: "easeOut" }} className="text-muted-foreground font-body leading-relaxed text-lg">
                      {collectionStories[storyIndex]}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>
              <div className="flex gap-4 mb-2">
                <button onClick={prevStory} className="p-3 border border-border hover:bg-secondary transition-colors group">
                  <ArrowLeft className="w-5 h-5 group-active:scale-90 transition-transform" />
                </button>
                <button onClick={nextStory} className="p-3 border border-border hover:bg-secondary transition-colors group">
                  <ArrowRight className="w-5 h-5 group-active:scale-90 transition-transform" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-stretch">
              <Link to="/category/earrings" className="md:col-span-7 group overflow-hidden relative aspect-[4/5] md:aspect-auto block min-h-[400px] md:min-h-[600px]">
                <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={earringsCollection} alt="Earrings collection" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />
                <div className="absolute bottom-8 left-8 text-white z-20">
                  <h3 className="font-headline text-3xl font-light italic mb-2">Organic Forms</h3>
                  <p className="font-label text-[10px] tracking-[0.2em] uppercase opacity-80">Shop Earrings</p>
                </div>
              </Link>
              <div className="md:col-span-5 flex flex-col gap-6 md:gap-8">
                <Link to="/category/bracelets" className="group overflow-hidden relative flex-1 aspect-[4/3] md:aspect-auto block min-h-[250px]">
                  <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={linkBracelet} alt="Chain collection" />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent" />
                  <div className="absolute bottom-6 left-6 text-white z-20">
                    <h3 className="font-headline text-2xl font-light italic mb-1">Chain Collection</h3>
                    <p className="font-label text-[10px] tracking-[0.2em] uppercase opacity-80">Shop Bracelets</p>
                  </div>
                </Link>
                <Link to="/category/rings" className="group overflow-hidden relative flex-1 aspect-[4/3] md:aspect-auto block min-h-[250px]">
                  <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={circularCollection} alt="Circular collection" />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent" />
                  <div className="absolute bottom-6 left-6 text-white z-20">
                    <h3 className="font-headline text-2xl font-light italic mb-1">Circular Elements</h3>
                    <p className="font-label text-[10px] tracking-[0.2em] uppercase opacity-80">Shop Rings</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════ Craftsmanship Story ═══════════════════════ */}
        <section className="py-16 md:py-32 bg-secondary overflow-hidden">
          <div className="max-w-screen-2xl mx-auto px-6 md:px-8">
            {/* Mobile: text first, then images side by side */}
            <div className="flex flex-col md:grid md:grid-cols-2 gap-10 md:gap-24 items-center">
              {/* Text - appears first on mobile */}
              <div className="space-y-6 md:space-y-10 order-1 md:order-2 py-0 md:py-12">
                <span className="font-label text-primary font-medium tracking-[0.2em] uppercase text-[10px] md:text-xs">Our Heritage</span>
                <h2 className="font-headline text-3xl md:text-5xl font-light italic leading-tight">Mastery<br />in Every Detail</h2>
                <div className="space-y-4 md:space-y-6 text-muted-foreground font-body leading-relaxed text-sm md:text-lg max-w-lg">
                  <p>Every ORLISSE piece begins as a hand-drawn sketch — a vision of balance and light. Our master artisans, with decades of tradition behind them, bring these visions to life.</p>
                  <p>We believe jewelry is more than an accessory — it's a vessel for stories. That's why we pour meticulous care into every piece in our collection.</p>
                </div>
                <div className="pt-4 md:pt-6 flex flex-col gap-4">
                  <Link to="/about/our-story" className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-12 h-[1px] bg-primary group-hover:w-20 transition-all duration-500" />
                    <span className="font-label text-xs tracking-[0.15em] uppercase font-semibold">Read Our Story</span>
                  </Link>
                  <Link to="/about/sustainability" className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-12 h-[1px] bg-primary group-hover:w-20 transition-all duration-500" />
                    <span className="font-label text-xs tracking-[0.15em] uppercase font-semibold">Sustainability</span>
                  </Link>
                </div>
              </div>
              {/* Images - below text on mobile, left on desktop */}
              <div className="relative order-2 md:order-1">
                <div className="flex gap-3 md:block">
                  <div className="flex-1 md:aspect-[3/4] aspect-[2/3] overflow-hidden relative z-10">
                    <img className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" src={artisanCraftsmanship} alt="Artisan craftsmanship" />
                  </div>
                  <div className="flex-1 aspect-[2/3] md:aspect-square overflow-hidden md:absolute md:-bottom-12 md:-right-12 md:w-2/3 md:border-[16px] md:border-secondary z-20">
                    <img className="w-full h-full object-cover" src={foundersPortrait} alt="Our founders" loading="lazy" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════ Featured Products (Shopify) ═══════════════════════ */}
        <section className="py-24 md:py-32 bg-background">
          <div className="max-w-screen-2xl mx-auto px-6 md:px-8">
            <div className="text-center mb-16 md:mb-24">
              <h2 className="font-headline text-3xl md:text-5xl font-light italic mb-6">Exquisite Selection</h2>
              <div className="h-[1px] w-20 bg-primary mx-auto" />
            </div>

            {loading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground">No products found</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 md:gap-x-8 gap-y-12 md:gap-y-20">
                {products.map((product) => {
                  const p = product.node;
                  const image = p.images.edges[0]?.node;
                  const variant = p.variants.edges[0]?.node;
                  const price = p.priceRange.minVariantPrice;

                  return (
                    <motion.div
                      key={p.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="group cursor-pointer"
                    >
                      <Link to={`/product/${p.handle}`}>
                        <div className="aspect-[4/5] bg-secondary overflow-hidden mb-5 relative">
                          {image && (
                            <img src={image.url} alt={image.altText || p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                          )}
                          <div className="absolute bottom-0 left-0 right-0 bg-foreground text-background py-3.5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 font-label text-[10px] tracking-[0.2em] uppercase text-center hidden md:block">
                            Quick View
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <h3 className="font-headline text-base font-normal group-hover:text-primary transition-colors">{p.title}</h3>
                          <p className="font-label text-[10px] tracking-[0.15em] uppercase text-muted-foreground">{p.productType}</p>
                          <p className="font-serif-italic text-lg text-primary">{formatShopifyPrice(price.amount, price.currencyCode)}</p>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            )}

            <div className="mt-16 md:mt-24 text-center">
              <Link to="/category/shop"
                className="inline-block border border-foreground py-4 px-12 md:px-16 hover:bg-foreground hover:text-background transition-all duration-500 font-label text-[10px] md:text-xs tracking-[0.3em] uppercase">
                Show More Masterpieces
              </Link>
            </div>
          </div>
        </section>

        {/* ═══════════════════════ Newsletter ═══════════════════════ */}
        <section className="py-24 md:py-32 bg-secondary">
          <div className="max-w-screen-xl mx-auto px-6 md:px-8 text-center">
            <span className="font-label text-primary font-medium tracking-[0.2em] uppercase text-[10px] md:text-xs mb-4 block">Join Our Circle</span>
            <h2 className="font-headline text-3xl md:text-5xl font-light italic mb-6">The Inner Atelier</h2>
            <p className="text-muted-foreground font-body max-w-lg mx-auto mb-10 leading-relaxed">
              Be the first to discover new collections, exclusive previews, and stories from behind the bench. A curated newsletter for the discerning eye.
            </p>
            <AnimatePresence mode="wait">
              {!isSubscribed ? (
                <motion.form key="subscribe-form" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  onSubmit={handleSubscribe} className="max-w-md mx-auto flex gap-4">
                  <input className="flex-grow bg-transparent border-0 border-b border-border py-3 focus:ring-0 focus:border-primary transition-colors font-body text-foreground placeholder:text-muted-foreground outline-none"
                    placeholder="Email Address" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                  <button className="font-label text-xs tracking-[0.15em] uppercase font-semibold text-primary hover:text-foreground transition-colors" type="submit">Subscribe</button>
                </motion.form>
              ) : (
                <motion.div key="subscribe-success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  className="max-w-md mx-auto py-4 text-primary font-headline text-xl italic">
                  Thank you for joining our circle.
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
