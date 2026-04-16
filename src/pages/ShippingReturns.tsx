import { useEffect } from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

const ShippingReturns = () => {
  useEffect(() => {
    document.title = "Shipping & Returns - ORLISSE";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-6">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <header className="mb-12 text-center">
            <h1 className="text-4xl font-light text-foreground mb-4">Shipping & Returns</h1>
            <p className="text-muted-foreground">Your satisfaction is our priority</p>
          </header>

          <div className="prose prose-lg max-w-none space-y-10">
            {/* Shipping */}
            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">Shipping Information</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>All orders are carefully packaged in our signature gift box and shipped via insured express delivery.</p>
                <div className="border border-border p-6 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-foreground">Domestic (United States)</span>
                    <span>3–5 business days</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-foreground">Canada & Mexico</span>
                    <span>5–8 business days</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-foreground">International</span>
                    <span>7–14 business days</span>
                  </div>
                </div>
                <p>Complimentary shipping is offered on all orders over $500. A flat rate of $15 applies to orders below this threshold.</p>
                <p>Once your order has been dispatched, you will receive a confirmation email with a tracking number.</p>
              </div>
            </section>

            {/* Returns */}
            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">Return Policy</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>We accept returns within <strong className="text-foreground">30 days</strong> of delivery for a full refund or exchange. Items must be in their original, unworn condition and returned in their original packaging.</p>
                <h3 className="text-lg font-light text-foreground mt-6 mb-2">How to Initiate a Return</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  <li>Contact our Customer Care team at <span className="text-foreground">care@orlissejewelry.com</span></li>
                  <li>You will receive a prepaid return label within 24 hours</li>
                  <li>Package the item securely in its original box</li>
                  <li>Drop off at any authorized carrier location</li>
                </ol>
                <p className="text-sm">Refunds are processed within 5–7 business days after we receive your return.</p>
              </div>
            </section>

            {/* Exchanges */}
            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">Exchanges & Resizing</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>Need a different size? We offer one complimentary resize within 60 days of purchase for rings and bracelets. Contact our Customer Care team to arrange this service.</p>
                <p>For exchanges, please follow the return process above and place a new order for the desired item.</p>
              </div>
            </section>

            {/* Warranty */}
            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">Warranty & Care</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>Every ORLISSE piece comes with a <strong className="text-foreground">2-year limited warranty</strong> covering manufacturing defects. This does not cover normal wear and tear, accidental damage, or unauthorized alterations.</p>
                <p>For warranty claims, please contact our Customer Care team with your order number and photos of the item.</p>
              </div>
            </section>

            {/* FAQ */}
            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {[
                  { q: "Can I cancel my order?", a: "Orders can be cancelled within 2 hours of placement. After that, the order enters fulfillment and cannot be modified." },
                  { q: "Do you ship internationally?", a: "Yes, we ship to over 50 countries worldwide. International orders may be subject to local customs duties and taxes." },
                  { q: "Is my jewelry insured during shipping?", a: "All shipments are fully insured against loss or damage during transit at no additional cost." },
                  { q: "Can I return a custom or engraved piece?", a: "Custom and engraved items are final sale and cannot be returned unless there is a manufacturing defect." },
                  { q: "How do I care for my jewelry?", a: "Store pieces individually in the provided pouch, avoid contact with perfumes and chemicals, and clean gently with a soft cloth. Visit our Customer Care page for detailed care instructions." },
                ].map((faq, i) => (
                  <div key={i} className="border-b border-border pb-4">
                    <h3 className="text-sm font-medium text-foreground mb-2">{faq.q}</h3>
                    <p className="text-sm text-muted-foreground">{faq.a}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ShippingReturns;
