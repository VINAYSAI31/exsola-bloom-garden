import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-mushrooms.jpg";

const HeroSection = () => {
  return (
    <section className="relative h-[600px] flex items-center justify-start overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
            Simply It's All About Mushroom
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Discover the finest organic mushrooms, grown with care and passion for your health and wellness.
          </p>
          <Link to="/about">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-accent">
              Learn More
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
