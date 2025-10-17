import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import featuredImage from "@/assets/featured-mushrooms.jpg";

const About = () => {
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
        {/* Hero Section */}
        <section className="py-20 section-gradient">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6" data-aos="fade-up">
              About Exsola
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="100">
              Your trusted source for premium organic mushrooms
            </p>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20 bg-card">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div data-aos="fade-right">
                <img 
                  src={featuredImage} 
                  alt="Our Story" 
                  className="rounded-lg shadow-warm w-full h-auto object-cover"
                />
              </div>
              <div data-aos="fade-left">
                <h2 className="text-4xl font-bold mb-6">Our Story</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Founded with a passion for sustainable agriculture and healthy living, Exsola has been 
                    dedicated to bringing the finest organic mushrooms to your table since our inception.
                  </p>
                  <p>
                    Our journey began with a simple belief: that quality mushrooms should be accessible to everyone 
                    who values nutrition and flavor. Today, we're proud to serve thousands of customers who trust 
                    us for their mushroom needs.
                  </p>
                  <p>
                    Every mushroom we grow is a testament to our commitment to excellence, sustainability, 
                    and the health of our community.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-20 section-gradient">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12" data-aos="fade-up">
              Our Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center" data-aos="fade-up" data-aos-delay="100">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-accent-foreground">Q</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Quality</h3>
                <p className="text-muted-foreground">
                  We never compromise on the quality of our products, ensuring every mushroom meets our high standards.
                </p>
              </div>
              <div className="text-center" data-aos="fade-up" data-aos-delay="200">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-accent-foreground">S</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Sustainability</h3>
                <p className="text-muted-foreground">
                  Our farming practices are designed to protect the environment for future generations.
                </p>
              </div>
              <div className="text-center" data-aos="fade-up" data-aos-delay="300">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-accent-foreground">I</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Integrity</h3>
                <p className="text-muted-foreground">
                  We believe in transparency and honesty in everything we do, from farm to table.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-card">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12" data-aos="fade-up">
              Meet Our Team
            </h2>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
              Our dedicated team of mushroom cultivators, food scientists, and customer service professionals 
              work together to bring you the best possible experience.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
