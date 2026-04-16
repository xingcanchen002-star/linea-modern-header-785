import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import Pagination from "./Pagination";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import { formatShopifyPrice } from "@/lib/shopify";

interface ProductGridProps {
  searchQuery?: string;
}

const ProductGrid = ({ searchQuery }: ProductGridProps) => {
  const { products, loading, error } = useShopifyProducts(24, searchQuery);

  if (loading) {
    return (
      <section className="w-full px-6 md:px-8 mb-16">
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full px-6 md:px-8 mb-16">
        <div className="text-center py-20">
          <p className="text-destructive">{error}</p>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="w-full px-6 md:px-8 mb-16">
        <div className="text-center py-20">
          <p className="text-muted-foreground text-lg">No products found</p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full px-6 md:px-8 mb-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 md:gap-x-8 gap-y-12 md:gap-y-16">
        {products.map((product) => {
          const p = product.node;
          const image = p.images.edges[0]?.node;
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
                    <img
                      src={image.url}
                      alt={image.altText || p.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-foreground text-background py-3.5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 font-label text-[10px] tracking-[0.2em] uppercase text-center hidden md:block">
                    Quick View
                  </div>
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-headline text-base font-normal group-hover:text-primary transition-colors">
                    {p.title}
                  </h3>
                  <p className="font-label text-[10px] tracking-[0.15em] uppercase text-muted-foreground">
                    {p.productType}
                  </p>
                  <p className="font-serif-italic text-lg text-primary">
                    {formatShopifyPrice(price.amount, price.currencyCode)}
                  </p>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default ProductGrid;
