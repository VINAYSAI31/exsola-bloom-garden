import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import featuredImage from "@/assets/featured-mushrooms.jpg";

const FeaturedSection = () => {
  return (
    <section className="py-20 section-gradient">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Left Image */}
          <div className="flex-1" data-aos="fade-right">
            <img 
              src={featuredImage} 
              alt="Gourmet Mushrooms" 
              className="rounded-lg shadow-warm w-full h-auto object-cover"
            />
          </div>

          {/* Center Content */}
          <div className="flex-1 text-center" data-aos="fade-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              A Mushroom Is Full Of Delight
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
            </p>
            <Link to="/about">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Discover Us
              </Button>
            </Link>
          </div>

          {/* Right Image */}
          <div className="flex-1" data-aos="fade-left">
            <img 
              src={featuredImage} 
              alt="Fresh Mushrooms" 
              className="rounded-lg shadow-warm w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
