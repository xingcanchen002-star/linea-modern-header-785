import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface CategoryHeaderProps {
  category: string;
}

const CategoryHeader = ({ category }: CategoryHeaderProps) => {
  const capitalizedCategory = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <section className="w-full px-6 md:px-8 mb-12">
      <div className="mb-6">
        <Breadcrumb>
          <BreadcrumbList className="font-label text-[10px] tracking-[0.15em] uppercase">
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{capitalizedCategory}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="space-y-1.5 md:space-y-3">
        <span className="font-label text-[10px] tracking-[0.2em] uppercase text-primary font-bold block">
          The Signature Series
        </span>
        <h1 className="font-headline text-3xl md:text-5xl italic text-foreground">
          {capitalizedCategory}
        </h1>
        <p className="font-body text-muted-foreground max-w-xl leading-relaxed text-sm">
          A curated selection of artisanal masterpieces, where heritage craftsmanship meets contemporary elegance.
        </p>
      </div>
    </section>
  );
};

export default CategoryHeader;
