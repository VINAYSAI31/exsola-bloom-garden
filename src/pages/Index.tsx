import { useEffect } from "react";
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

// Mock product data
const featuredProducts = [
  {
    id: "1",
    name: "Organic Button Mushrooms",
    price: 8.99,
    image: "https://images.unsplash.com/photo-1568471173230-b71caaa0d18f?w=500&h=500&fit=crop",
    description: "Fresh, organic button mushrooms perfect for any dish",
  },
  {
    id: "2",
    name: "Shiitake Mushrooms",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1561507930-9ffffdfa8e9b?w=500&h=500&fit=crop",
    description: "Premium shiitake mushrooms with rich, savory flavor",
  },
  {
    id: "3",
    name: "Oyster Mushrooms",
    price: 10.99,
    image: "",
    description: "Delicate oyster mushrooms with a mild, sweet taste",
  },
  {
    id: "4",
    name: "Portobello Mushrooms",
    price: 9.99,
    image: "https://images.unsplash.com/photo-1583697013014-a0b8b64d64b3?w=500&h=500&fit=crop",
    description: "Large, meaty portobello mushrooms ideal for grilling",
  },
];

const Index = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out",
    });
  }, []);

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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>

            <div className="text-center" data-aos="fade-up">
              <Link to="/products">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  View All Products
                </Button>
              </Link>
            </div>
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
