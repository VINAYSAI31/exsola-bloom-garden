import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import howWeImage from "@/assets/how-we-make.jpg";

const HowWeMakePage = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out",
    });
  }, []);

  const steps = [
    {
      number: "01",
      title: "Spore Selection",
      description: "We carefully select the finest mushroom spores from certified organic sources to ensure genetic quality and purity.",
    },
    {
      number: "02",
      title: "Substrate Preparation",
      description: "Our organic substrate is prepared using sustainable materials, creating the perfect growing medium for our mushrooms.",
    },
    {
      number: "03",
      title: "Inoculation",
      description: "The selected spores are introduced to the prepared substrate in our sterile cultivation facility.",
    },
    {
      number: "04",
      title: "Climate Control",
      description: "We maintain optimal temperature, humidity, and air quality throughout the growing cycle for perfect mushroom development.",
    },
    {
      number: "05",
      title: "Growth Monitoring",
      description: "Our experienced cultivators monitor each batch daily, ensuring healthy growth and identifying the perfect harvest time.",
    },
    {
      number: "06",
      title: "Harvest & Packaging",
      description: "Mushrooms are hand-harvested at peak freshness and immediately packaged to preserve their quality and nutritional value.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="py-20 section-gradient">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6" data-aos="fade-up">
              How We Make Our Mushrooms
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="100">
              Discover our careful cultivation process from spore to harvest
            </p>
          </div>
        </section>

        {/* Image Section */}
        <section className="py-20 bg-card">
          <div className="container mx-auto px-4">
            <div data-aos="zoom-in">
              <img 
                src={howWeImage} 
                alt="Mushroom Cultivation Facility" 
                className="rounded-lg shadow-accent w-full max-w-5xl mx-auto h-auto object-cover"
              />
            </div>
          </div>
        </section>

        {/* Process Steps */}
        <section className="py-20 section-gradient">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16" data-aos="fade-up">
              Our Cultivation Process
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <div 
                  key={step.number}
                  className="relative p-6 bg-card rounded-lg shadow-warm"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="text-6xl font-bold text-accent/20 absolute top-4 right-4">
                    {step.number}
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 relative z-10">{step.title}</h3>
                  <p className="text-muted-foreground relative z-10">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quality Commitment */}
        <section className="py-20 bg-card">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center" data-aos="fade-up">
              <h2 className="text-4xl font-bold mb-6">Our Quality Commitment</h2>
              <p className="text-muted-foreground text-lg mb-8">
                Every step of our process is carefully monitored to ensure the highest quality. 
                We use only organic methods, maintain strict hygiene standards, and never use 
                harmful chemicals or pesticides. Our mushrooms are tested regularly for quality 
                and safety, giving you complete peace of mind with every purchase.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                <div>
                  <p className="text-4xl font-bold text-accent mb-2">100%</p>
                  <p className="text-sm text-muted-foreground">Organic</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-accent mb-2">0</p>
                  <p className="text-sm text-muted-foreground">Pesticides</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-accent mb-2">24h</p>
                  <p className="text-sm text-muted-foreground">Fresh</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-accent mb-2">15+</p>
                  <p className="text-sm text-muted-foreground">Years Experience</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HowWeMakePage;
