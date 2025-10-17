import howWeImage from "@/assets/how-we-make.jpg";

const HowWeMake = () => {
  return (
    <section className="py-20 section-gradient">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div data-aos="fade-right">
            <img 
              src={howWeImage} 
              alt="Mushroom Cultivation" 
              className="rounded-lg shadow-warm w-full h-auto object-cover"
            />
          </div>

          {/* Content */}
          <div data-aos="fade-left">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">How We Make</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Our mushroom cultivation process combines traditional farming wisdom with modern sustainable practices. 
                Each mushroom is grown in carefully controlled environments to ensure the highest quality and nutritional value.
              </p>
              <p>
                We use organic substrates and maintain optimal temperature and humidity levels throughout the growing cycle. 
                Our facilities are regularly inspected to meet the highest food safety standards.
              </p>
              <p>
                From spore to harvest, every step is monitored by our experienced cultivators who are passionate about 
                delivering premium mushrooms to your table.
              </p>
              <ul className="list-disc list-inside space-y-2 mt-6">
                <li>100% Organic growing methods</li>
                <li>Sustainable farming practices</li>
                <li>Regular quality inspections</li>
                <li>Fresh daily harvest</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWeMake;
