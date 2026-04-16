import { useState, useRef, useCallback } from "react";

interface MobileImageCarouselProps {
  images: Array<{ url: string; altText?: string | null }>;
  productTitle: string;
  onImageClick?: (index: number) => void;
}

const MobileImageCarousel = ({ images, productTitle, onImageClick }: MobileImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const scrollLeft = scrollRef.current.scrollLeft;
    const width = scrollRef.current.offsetWidth;
    const newIndex = Math.round(scrollLeft / width);
    setCurrentIndex(newIndex);
  }, []);

  return (
    <div className="relative">
      {/* Scrollable image strip */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
      >
        {images.map((img, index) => (
          <div
            key={index}
            className="w-full flex-shrink-0 snap-center"
            onClick={() => onImageClick?.(index)}
          >
            <div className="aspect-[4/5] bg-secondary">
              <img
                src={img.url}
                alt={img.altText || `${productTitle} - View ${index + 1}`}
                className="w-full h-full object-cover"
                loading={index === 0 ? "eager" : "lazy"}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Dot indicators */}
      {images.length > 1 && (
        <div className="flex justify-center gap-1.5 mt-3">
          {images.map((_, index) => (
            <button
              key={index}
              aria-label={`Go to image ${index + 1}`}
              className={`rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "w-6 h-1.5 bg-primary"
                  : "w-1.5 h-1.5 bg-border"
              }`}
              onClick={() => {
                scrollRef.current?.scrollTo({
                  left: index * (scrollRef.current?.offsetWidth || 0),
                  behavior: "smooth",
                });
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MobileImageCarousel;
