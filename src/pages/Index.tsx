import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import FeaturedSection from "@/components/FeaturedSection";
import HealthBenefits from "@/components/HealthBenefits";
import HowWeMake from "@/components/HowWeMake";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

const Index = () => {
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out",
    });
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("in_stock", true)
      .order("created_at", { ascending: false })
      .limit(4);

    if (!error && data) {
      setFeaturedProducts(data);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <FeaturedSection />

        {/* Featured Products Section */}
        <section className="py-20 bg-card">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12" data-aos="fade-up">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Products</h2>
              <p className="text-muted-foreground text-lg">
                Discover our premium selection of organic mushrooms
              </p>
            </div>

            {loading ? (
              <div className="flex justify-center items-center min-h-[300px]">
                <Loader2 className="h-8 w-8 animate-spin text-accent" />
              </div>
            ) : featuredProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                  {featuredProducts.map((product) => (
                    <ProductCard 
                      key={product.id}
                      id={product.id}
                      name={product.name}
                      price={product.price}
                      image={product.image_url}
                      description={product.description}
                    />
                  ))}
                </div>

                <div className="text-center" data-aos="fade-up">
                  <Link to="/products">
                    <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                      View All Products
                    </Button>
                  </Link>
                </div>
              </>
            ) : (
              <p className="text-center text-muted-foreground">No products available at the moment.</p>
            )}
          </div>
        </section>

        <HowWeMake />
        <HealthBenefits />

        {/* About Section */}
        <section className="py-20 section-gradient">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center" data-aos="fade-up">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">About Exsola</h2>
              <p className="text-muted-foreground text-lg mb-8">
                Exsola is dedicated to bringing you the finest organic mushrooms, cultivated with care and passion. 
                Our commitment to quality and sustainability ensures that every mushroom delivers exceptional taste 
                and nutritional benefits to your table.
              </p>
              <Link to="/about">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  Learn More About Us
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
