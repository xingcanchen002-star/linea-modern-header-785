import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, X, Heart, Menu, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ShoppingBag from "./ShoppingBag";
import { useCartStore } from "@/stores/cartStore";
import { useWishlist } from "@/context/WishlistContext";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const location = useLocation();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [offCanvasType, setOffCanvasType] = useState<"favorites" | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isShoppingBagOpen, setIsShoppingBagOpen] = useState(false);

  const itemCount = useCartStore(state => state.itemCount)();
  const { wishlist, toggleWishlist, isInWishlist } = useWishlist();

  const popularSearches = [
    "Gold Rings",
    "Silver Necklaces",
    "Pearl Earrings",
    "Designer Bracelets",
  ];

  const navItems = [
    {
      name: "Shop",
      href: "/category/shop",
      submenuItems: ["Rings", "Necklaces", "Earrings", "Bracelets", "Watches"],
      images: [
        { src: "/rings-collection.png", alt: "Rings Collection", label: "Rings" },
        { src: "/earrings-collection.png", alt: "Earrings Collection", label: "Earrings" },
      ],
    },
    {
      name: "New in",
      href: "/category/new-in",
      submenuItems: ["This Week's Arrivals", "Spring Collection", "Featured Designers", "Limited Edition", "Pre-Orders"],
      images: [
        { src: "/arcus-bracelet.png", alt: "Arcus Bracelet", label: "Arcus Bracelet" },
        { src: "/span-bracelet.png", alt: "Span Bracelet", label: "Span Bracelet" },
      ],
    },
    {
      name: "About",
      href: "/about/our-story",
      submenuItems: ["Our Story", "Sustainability", "Size Guide", "Customer Care", "Store Locator"],
      images: [{ src: "/founders.png", alt: "Company Founders", label: "Read our story" }],
    },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      window.location.href = `/category/shop?q=${encodeURIComponent(searchQuery.trim())}`;
      setSearchQuery("");
    }
  };

  return (
    <>
      <nav
        className="relative"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(10px)",
        }}
      >
        <div className="flex items-center justify-between h-16 px-6">
          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 text-foreground hover:text-muted-foreground transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Left navigation */}
          <div className="hidden lg:flex space-x-8">
            {navItems.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={item.href}
                  className={cn(
                    "text-foreground hover:text-primary transition-colors duration-200 text-sm font-light py-6 block",
                    location.pathname.startsWith(item.href) && "text-primary"
                  )}
                >
                  {item.name}
                </Link>
              </div>
            ))}
          </div>

          {/* Center logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Link to="/" className="block">
              <img src="/ORLISSE-1.svg" alt="ORLISSE" className="h-6 w-auto" />
            </Link>
          </div>

          {/* Right icons */}
          <div className="flex items-center space-x-2">
            <button
              className="p-2 text-foreground hover:text-primary transition-colors duration-200"
              aria-label="Search"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              className="hidden lg:block p-2 text-foreground hover:text-primary transition-colors duration-200 relative"
              aria-label="Favorites"
              onClick={() => setOffCanvasType("favorites")}
            >
              <Heart
                className={cn(
                  "w-5 h-5",
                  wishlist.length > 0 && "fill-primary text-primary"
                )}
              />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-foreground text-background text-[0.5rem] font-semibold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>
            <button
              className="p-2 text-foreground hover:text-primary transition-colors duration-200 relative"
              aria-label="Shopping bag"
              onClick={() => setIsShoppingBagOpen(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[30%] text-[0.5rem] font-semibold text-foreground pointer-events-none">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Desktop dropdown */}
        {activeDropdown && (
          <div
            className="absolute top-full left-0 right-0 bg-background border-b border-border z-50"
            onMouseEnter={() => setActiveDropdown(activeDropdown)}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <div className="px-6 py-8">
              <div className="flex justify-between w-full">
                <div className="flex-1">
                  <ul className="space-y-2">
                    {navItems
                      .find((item) => item.name === activeDropdown)
                      ?.submenuItems.map((subItem, index) => (
                        <li key={index}>
                          <Link
                            to={
                              activeDropdown === "About"
                                ? `/about/${subItem.toLowerCase().replace(/\s+/g, "-")}`
                                : `/category/${subItem.toLowerCase()}`
                            }
                            className="text-foreground hover:text-primary transition-colors duration-200 text-sm font-light block py-2"
                          >
                            {subItem}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
                <div className="flex space-x-6">
                  {navItems
                    .find((item) => item.name === activeDropdown)
                    ?.images.map((image, index) => {
                      let linkTo = "/";
                      if (activeDropdown === "Shop") {
                        if (image.label === "Rings") linkTo = "/category/rings";
                        else if (image.label === "Earrings") linkTo = "/category/earrings";
                      } else if (activeDropdown === "New in") {
                        if (image.label === "Arcus Bracelet") linkTo = "/product/arcus-bracelet";
                        else if (image.label === "Span Bracelet") linkTo = "/product/span-bracelet";
                      } else if (activeDropdown === "About") {
                        linkTo = "/about/our-story";
                      }
                      return (
                        <Link key={index} to={linkTo} className="w-[400px] h-[280px] cursor-pointer group relative overflow-hidden block">
                          <img src={image.src} alt={image.alt} className="w-full h-full object-cover transition-opacity duration-200 group-hover:opacity-90" />
                          <div className="absolute bottom-2 left-2 text-background text-xs font-light flex items-center gap-1">
                            <span>{image.label}</span>
                            <ArrowRight size={12} />
                          </div>
                        </Link>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Fullscreen Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center px-8"
          >
            <button
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-8 right-8 p-4 hover:rotate-90 transition-transform duration-300"
            >
              <X className="w-8 h-8 text-muted-foreground" />
            </button>

            <div className="w-full max-w-4xl space-y-12">
              <div className="text-center space-y-4">
                <span className="font-label text-[10px] tracking-[0.3em] uppercase text-primary">
                  Search Our Collection
                </span>
                <h2 className="font-headline text-3xl md:text-5xl italic text-foreground">
                  What are you looking for?
                </h2>
              </div>

              <form onSubmit={handleSearch} className="relative">
                <input
                  autoFocus
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for rings, necklaces, or collections..."
                  className="w-full bg-transparent border-b-2 border-border py-6 md:py-8 text-2xl md:text-4xl font-headline italic focus:border-primary outline-none transition-colors placeholder:text-muted-foreground/30"
                />
                <button
                  type="submit"
                  className="absolute right-0 top-1/2 -translate-y-1/2 p-4 text-primary hover:scale-110 transition-transform"
                >
                  <Search className="w-10 h-10" />
                </button>
              </form>

              <div className="flex flex-wrap gap-4 justify-center">
                <span className="font-label text-[10px] tracking-widest uppercase text-muted-foreground w-full text-center mb-2">
                  Popular Searches
                </span>
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => {
                      setIsSearchOpen(false);
                      window.location.href = `/category/shop?q=${encodeURIComponent(term)}`;
                    }}
                    className="px-6 py-3 border border-border font-label text-[10px] tracking-widest uppercase text-foreground hover:bg-muted/30 hover:border-primary transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-[105]"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-0 md:right-auto md:w-[400px] z-[110] bg-background flex flex-col shadow-2xl"
            >
              {/* Mobile header */}
              <div className="flex justify-between items-center px-6 py-6 border-b border-border">
                <Link
                  to="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block"
                >
                  <img src="/ORLISSE-1.svg" alt="ORLISSE" className="h-5 w-auto" />
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 hover:bg-muted/30 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-muted-foreground" />
                </button>
              </div>

              {/* Mobile nav links */}
              <div className="flex-grow overflow-y-auto px-6 py-8">
                <div className="flex flex-col gap-6">
                  {navItems.map((item) => (
                    <div key={item.name}>
                      <Link
                        to={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          "text-xl font-headline italic text-foreground hover:text-primary transition-colors block mb-3",
                          location.pathname.startsWith(item.href) && "text-primary"
                        )}
                      >
                        {item.name}
                      </Link>
                      <div className="pl-4 space-y-2">
                        {item.submenuItems.map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            to={
                              item.name === "About"
                                ? `/about/${subItem.toLowerCase().replace(/\s+/g, "-")}`
                                : `/category/${subItem.toLowerCase()}`
                            }
                            className="text-sm font-light text-muted-foreground hover:text-primary block py-1 transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {subItem}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mobile footer actions */}
              <div className="px-6 py-6 border-t border-border space-y-4">
                <Link
                  to="/wishlist"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between py-3 text-foreground hover:text-primary transition-colors"
                >
                  <span className="font-label text-[10px] tracking-widest uppercase">
                    Favorites
                  </span>
                  <div className="flex items-center gap-2">
                    {wishlist.length > 0 && (
                      <span className="text-[10px] text-primary font-bold">{wishlist.length}</span>
                    )}
                    <Heart className={cn("w-4 h-4", wishlist.length > 0 && "fill-primary text-primary")} />
                  </div>
                </Link>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsSearchOpen(true);
                  }}
                  className="flex items-center justify-between py-3 w-full text-foreground hover:text-primary transition-colors"
                >
                  <span className="font-label text-[10px] tracking-widest uppercase">Search</span>
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Shopping Bag */}
      <ShoppingBag
        isOpen={isShoppingBagOpen}
        onClose={() => setIsShoppingBagOpen(false)}
        onViewFavorites={() => {
          setIsShoppingBagOpen(false);
          setOffCanvasType("favorites");
        }}
      />

      {/* Favorites Off-canvas */}
      {offCanvasType === "favorites" && (
        <div className="fixed inset-0 z-50 h-screen">
          <div className="absolute inset-0 bg-foreground/50 h-screen" onClick={() => setOffCanvasType(null)} />
          <div className="absolute right-0 top-0 h-screen w-96 bg-background border-l border-border animate-slide-in-right flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-lg font-light text-foreground">Your Favorites</h2>
              <button onClick={() => setOffCanvasType(null)} className="p-2 text-foreground hover:text-muted-foreground transition-colors" aria-label="Close">
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              {wishlist.length === 0 ? (
                <p className="text-muted-foreground text-sm mb-6">
                  You haven't added any favorites yet. Browse our collection and click the heart icon to save items you love.
                </p>
              ) : (
                <div className="space-y-6">
                  <p className="text-muted-foreground text-sm">You have {wishlist.length} item{wishlist.length !== 1 ? 's' : ''} in your favorites.</p>
                  <Link
                    to="/wishlist"
                    onClick={() => setOffCanvasType(null)}
                    className="block text-center text-sm font-light text-foreground underline underline-offset-4 mt-4"
                  >
                    View all favorites
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
