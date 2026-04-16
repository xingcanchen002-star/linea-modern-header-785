import { useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import CategoryHeader from "../components/category/CategoryHeader";
import FilterSortBar from "../components/category/FilterSortBar";
import ProductGrid from "../components/category/ProductGrid";
import { cn } from "@/lib/utils";

const productTypes = [
  { label: "All", slug: "shop" },
  { label: "Rings", slug: "rings" },
  { label: "Necklaces", slug: "necklaces" },
  { label: "Earrings", slug: "earrings" },
  { label: "Bracelets", slug: "bracelets" },
];

const Category = () => {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const searchQuery = searchParams.get("q") || undefined;

  const activeSlug = category?.toLowerCase() || "shop";

  // Map category slug to Shopify product_type query
  const getCategoryQuery = () => {
    if (!category || category === "shop") return searchQuery;
    if (category === "new-in") return searchQuery ? `tag:new AND ${searchQuery}` : undefined;
    const typeMap: Record<string, string> = {
      rings: "Rings",
      necklaces: "Necklaces",
      earrings: "Earrings",
      bracelets: "Bracelets",
      watches: "Watches",
    };
    const productType = typeMap[category.toLowerCase()];
    if (productType) {
      const typeQuery = `product_type:${productType}`;
      return searchQuery ? `${typeQuery} AND ${searchQuery}` : typeQuery;
    }
    return searchQuery;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-6">
        <CategoryHeader 
          category={category || 'All Products'} 
        />

        {/* Product Type Filter Tabs */}
        <div className="w-full px-6 md:px-8 mb-6">
          <div className="flex flex-wrap gap-2 justify-center">
            {productTypes.map((type) => (
              <button
                key={type.slug}
                onClick={() => navigate(`/category/${type.slug}`)}
                className={cn(
                  "px-5 py-2 text-[10px] tracking-[0.2em] uppercase font-label border transition-colors duration-200",
                  activeSlug === type.slug
                    ? "bg-foreground text-background border-foreground"
                    : "bg-transparent text-muted-foreground border-border hover:border-foreground hover:text-foreground"
                )}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>
        
        <FilterSortBar 
          filtersOpen={filtersOpen}
          setFiltersOpen={setFiltersOpen}
          itemCount={24}
        />
        
        <ProductGrid searchQuery={getCategoryQuery()} />
      </main>
      
      <Footer />
    </div>
  );
};

export default Category;