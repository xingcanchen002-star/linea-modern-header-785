import { Link } from "react-router-dom";
import { Globe, Share2, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-secondary border-t border-border pt-16 pb-6 px-6 md:px-8 mt-32">
      <div className="max-w-screen-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-12">
        {/* Brand */}
        <div className="space-y-6">
          <img
            src="/ORLISSE_Jewelry_Inc-2.svg"
            alt="ORLISSE Inc."
            className="h-6 w-auto"
          />
          <p className="text-muted-foreground font-body text-sm leading-relaxed max-w-xs">
            Crafting the heirlooms of tomorrow, today. Ethical, elegant, and ethereal fine jewelry from the heart of our artisan studio.
          </p>
          <div className="flex gap-4">
            <Globe className="w-5 h-5 text-muted-foreground cursor-pointer hover:text-primary transition-colors" />
            <Share2 className="w-5 h-5 text-muted-foreground cursor-pointer hover:text-primary transition-colors" />
            <Mail className="w-5 h-5 text-muted-foreground cursor-pointer hover:text-primary transition-colors" />
          </div>
        </div>

        {/* Collections */}
        <div>
          <h4 className="text-[10px] tracking-[0.2em] uppercase font-bold text-primary mb-6 font-label">Collections</h4>
          <ul className="space-y-3 font-label text-[10px] md:text-xs tracking-[0.15em] uppercase">
            <li><Link to="/category/rings" className="text-muted-foreground hover:text-primary transition-colors">Rings</Link></li>
            <li><Link to="/category/necklaces" className="text-muted-foreground hover:text-primary transition-colors">Necklaces</Link></li>
            <li><Link to="/category/earrings" className="text-muted-foreground hover:text-primary transition-colors">Earrings</Link></li>
            <li><Link to="/category/bracelets" className="text-muted-foreground hover:text-primary transition-colors">Bracelets</Link></li>
            <li><Link to="/category/shop" className="text-muted-foreground hover:text-primary transition-colors">All Collections</Link></li>
          </ul>
        </div>

        {/* Experience */}
        <div>
          <h4 className="text-[10px] tracking-[0.2em] uppercase font-bold text-primary mb-6 font-label">Experience</h4>
          <ul className="space-y-3 font-label text-[10px] md:text-xs tracking-[0.15em] uppercase">
            <li><Link to="/about/customer-care" className="text-muted-foreground hover:text-foreground transition-colors">Customer Care</Link></li>
            <li><Link to="/about/size-guide" className="text-muted-foreground hover:text-foreground transition-colors">Size Guide</Link></li>
            <li><Link to="/about/sustainability" className="text-muted-foreground hover:text-foreground transition-colors">Sustainability</Link></li>
            <li><Link to="/about/store-locator" className="text-muted-foreground hover:text-foreground transition-colors">Store Locator</Link></li>
            <li><Link to="/about/our-story" className="text-muted-foreground hover:text-foreground transition-colors">Our Story</Link></li>
            <li><Link to="/shipping-returns" className="text-muted-foreground hover:text-foreground transition-colors">Shipping & Returns</Link></li>
          </ul>
        </div>

        {/* Follow */}
        <div>
          <h4 className="text-[10px] tracking-[0.2em] uppercase font-bold text-primary mb-6 font-label">Follow</h4>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors font-label text-[10px] md:text-xs tracking-[0.15em] uppercase">Instagram</a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors font-label text-[10px] md:text-xs tracking-[0.15em] uppercase">Pinterest</a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors font-label text-[10px] md:text-xs tracking-[0.15em] uppercase">Journal</a>
          </div>
          <div className="mt-8">
            <p className="text-[10px] text-muted-foreground tracking-[0.15em] uppercase">
              © 2024 ORLISSE. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border pt-4 max-w-screen-2xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="text-[10px] text-muted-foreground tracking-[0.1em]">
            Template made by{" "}
            <a href="https://www.liljeros.co" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors underline">
              Rickard Liljeros
            </a>
          </p>
          <div className="flex space-x-6">
            <Link to="/privacy-policy" className="text-[10px] text-muted-foreground hover:text-primary transition-colors tracking-[0.1em] uppercase">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="text-[10px] text-muted-foreground hover:text-primary transition-colors tracking-[0.1em] uppercase">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
