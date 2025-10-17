import healthImage from "@/assets/health-benefits-center.jpg";

const benefits = [
  {
    number: 1,
    title: "Kicks Up Your Metabolism",
    description: "Praesent vestibulum molestie lacus. Aenean nonummy hendrerasellus portusce.",
  },
  {
    number: 2,
    title: "Increases Your Vitamin D",
    description: "Praesent vestibulum molestie lacus. Aenean nonummy hendrerasellus portusce.",
  },
  {
    number: 3,
    title: "Boosts Your Immune System",
    description: "Praesent vestibulum molestie lacus. Aenean nonummy hendrerasellus portusce.",
  },
  {
    number: 4,
    title: "Good for Your Bladder",
    description: "Praesent vestibulum molestie lacus. Aenean nonummy hendrerasellus portusce.",
  },
  {
    number: 5,
    title: "Gives You Antioxidants",
    description: "Praesent vestibulum molestie lacus. Aenean nonummy hendrerasellus portusce.",
  },
  {
    number: 6,
    title: "Improves Your Heart Health",
    description: "Praesent vestibulum molestie lacus. Aenean nonummy hendrerasellus portusce.",
  },
];

const HealthBenefits = () => {
  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Health Benefits</h2>
          <p className="text-muted-foreground text-lg">
            GMO-free organic products for healthy living
          </p>
          <div className="flex justify-center gap-2 mt-4">
            <span className="w-2 h-2 rounded-full bg-accent"></span>
            <span className="w-2 h-2 rounded-full bg-accent"></span>
            <span className="w-2 h-2 rounded-full bg-accent"></span>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="relative max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            {/* Left Column */}
            <div className="space-y-12">
              {benefits.slice(0, 3).map((benefit, index) => (
                <div 
                  key={benefit.number} 
                  className="flex gap-6" 
                  data-aos="fade-right"
                  data-aos-delay={index * 100}
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-lg">
                      {benefit.number}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column */}
            <div className="space-y-12">
              {benefits.slice(3).map((benefit, index) => (
                <div 
                  key={benefit.number} 
                  className="flex gap-6" 
                  data-aos="fade-left"
                  data-aos-delay={index * 100}
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-lg">
                      {benefit.number}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Center Image */}
          <div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden md:block"
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            <div className="w-80 h-80 rounded-full overflow-hidden shadow-accent bg-background p-8">
              <img 
                src={healthImage} 
                alt="Mushrooms" 
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HealthBenefits;
