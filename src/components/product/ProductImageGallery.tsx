import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { getProductById } from "@/data/products";
import { useParams } from "react-router-dom";

import pantheonImage from "@/assets/pantheon.jpg";
import eclipseImage from "@/assets/eclipse.jpg";
import haloImage from "@/assets/halo.jpg";
import organicEarring from "@/assets/organic-earring.png";
import linkBracelet from "@/assets/link-bracelet.webp";

const allImages = [pantheonImage, organicEarring, eclipseImage, linkBracelet, haloImage];

const ProductImageGallery = () => {
  const { productId } = useParams();
  const product = getProductById(Number(productId));

  // Use product image as first, then fill with extras
  const productImages = product
    ? [product.image, ...allImages.filter((img) => img !== product.image).slice(0, 3)]
    : allImages.slice(0, 4);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [zoomIndex, setZoomIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const openZoom = (index: number) => {
    setZoomIndex(index);
    setIsZoomOpen(true);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) setCurrentIndex((p) => (p + 1) % productImages.length);
      else setCurrentIndex((p) => (p - 1 + productImages.length) % productImages.length);
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div className="w-full">
      {/* Desktop: Main image + thumbnail grid */}
      <div className="hidden lg:block space-y-4">
        {/* Main hero image with hover zoom */}
        <motion.div
          className="aspect-[4/5] bg-secondary overflow-hidden cursor-zoom-in relative group"
          onClick={() => openZoom(0)}
        >
          <motion.img
            src={productImages[0]}
            alt="Product main view"
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-300" />
        </motion.div>

        {/* Thumbnail grid */}
        <div className="grid grid-cols-2 gap-4">
          {productImages.slice(1).map((image, index) => (
            <motion.div
              key={index}
              className="aspect-square bg-secondary overflow-hidden cursor-pointer group"
              onClick={() => openZoom(index + 1)}
              whileHover={{ scale: 0.98 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={image}
                alt={`Product view ${index + 2}`}
                className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-300"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mobile: Swipeable slider */}
      <div className="lg:hidden">
        <div className="relative">
          <div
            className="w-full aspect-square overflow-hidden cursor-pointer touch-pan-y"
            onClick={() => openZoom(currentIndex)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={productImages[currentIndex]}
                alt={`Product view ${currentIndex + 1}`}
                className="w-full h-full object-cover select-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="flex justify-center mt-4 gap-2">
            {productImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-foreground w-6" : "bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Fullscreen Zoom Modal */}
      <AnimatePresence>
        {isZoomOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <span className="font-label text-[10px] tracking-widest uppercase text-muted-foreground">
                {zoomIndex + 1} / {productImages.length}
              </span>
              <button
                onClick={() => setIsZoomOpen(false)}
                className="p-2 hover:rotate-90 transition-transform duration-300"
              >
                <X className="w-6 h-6 text-foreground" />
              </button>
            </div>

            {/* Image area */}
            <div className="flex-1 relative overflow-hidden flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.img
                  key={zoomIndex}
                  src={productImages[zoomIndex]}
                  alt={`Zoom view ${zoomIndex + 1}`}
                  className="max-w-full max-h-full object-contain"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                />
              </AnimatePresence>

              {/* Nav arrows */}
              {productImages.length > 1 && (
                <>
                  <button
                    onClick={() => setZoomIndex((p) => (p - 1 + productImages.length) % productImages.length)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-background/80 backdrop-blur-sm border border-border hover:bg-muted/50 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 text-foreground" />
                  </button>
                  <button
                    onClick={() => setZoomIndex((p) => (p + 1) % productImages.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-background/80 backdrop-blur-sm border border-border hover:bg-muted/50 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 text-foreground" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail strip */}
            <div className="flex justify-center gap-3 px-6 py-4 border-t border-border">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setZoomIndex(index)}
                  className={`w-16 h-16 overflow-hidden transition-all duration-300 ${
                    index === zoomIndex ? "ring-2 ring-primary opacity-100" : "opacity-40 hover:opacity-70"
                  }`}
                >
                  <img src={image} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductImageGallery;
