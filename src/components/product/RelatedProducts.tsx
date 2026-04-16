import { Link } from "react-router-dom";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import { formatShopifyPrice } from "@/lib/shopify";

interface RelatedProductsProps {
  currentHandle: string;
  productType?: string;
}

const RelatedProducts = ({ currentHandle, productType }: RelatedProductsProps) => {
  const { products, loading } = useShopifyProducts(8, productType ? `product_type:${productType}` : undefined);

  const related = products.filter(p => p.node.handle !== currentHandle).slice(0, 4);

  if (loading || related.length === 0) return null;

  return (
    <section className="w-full px-6 md:px-8 max-w-screen-2xl mx-auto py-12 md:py-20 border-t border-border">
      <h2 className="font-label text-[10px] tracking-[0.2em] uppercase text-foreground font-bold text-center mb-8 md:mb-12">
        You May Also Like
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {related.map((product) => {
          const image = product.node.images.edges[0]?.node;
          const price = product.node.priceRange.minVariantPrice;
          return (
            <Link
              key={product.node.id}
              to={`/product/${product.node.handle}`}
              className="group"
            >
              <div className="aspect-[3/4] bg-secondary overflow-hidden mb-3">
                {image && (
                  <img
                    src={image.url}
                    alt={image.altText || product.node.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                )}
              </div>
              <h3 className="font-body text-sm text-foreground group-hover:text-primary transition-colors">
                {product.node.title}
              </h3>
              <p className="font-body text-sm text-muted-foreground mt-0.5">
                {formatShopifyPrice(price.amount, price.currencyCode)}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default RelatedProducts;
