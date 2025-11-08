import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Users, CheckCircle2, Gift, Target } from "lucide-react";
import { toast } from "sonner";

interface Workshop {
  id: string;
  title: string;
  duration: string;
  format: string;
  learning_points: string[];
  take_home: string;
  best_for: string;
  price: number;
  image_url: string | null;
}

const Workshops = () => {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWorkshops();
  }, []);

  const fetchWorkshops = async () => {
    try {
      const { data, error } = await supabase
        .from("workshops")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setWorkshops(data || []);
    } catch (error) {
      console.error("Error fetching workshops:", error);
      toast.error("Failed to load workshops");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = (workshop: Workshop) => {
    const message = `Hi! I'd like to register for the ${workshop.title} workshop (₹${workshop.price})`;
    const whatsappUrl = `https://wa.me/918660677756?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Workshops & Training Programs
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Hands-on learning experiences with mushroom cultivation experts
          </p>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-12">
          {/* Why Join Section */}
          <div className="bg-card rounded-2xl p-8 lg:p-12 border border-border shadow-sm">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-8">
              Why Join Our Workshops?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                "Learn directly from researchers & cultivators",
                "Hands-on training — not just lectures",
                "Small batch sessions → personal attention",
                "Take home your own growing kit or extract sample",
                "Certificate of participation included for select programs",
              ].map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <p className="text-foreground leading-relaxed">{benefit}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Who Can Attend Section */}
          <div className="bg-card rounded-2xl p-8 lg:p-12 border border-border shadow-sm">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-8">
              Who Can Attend?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                "Students & researchers",
                "Wellness practitioners",
                "Food entrepreneurs",
                "Chefs & cafes",
                "Farmers & cultivators",
                "Anyone curious about mushrooms 🌱🍄",
              ].map((audience, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 bg-muted/50 rounded-lg px-4 py-3"
                >
                  <Users className="h-5 w-5 text-primary flex-shrink-0" />
                  <p className="text-foreground">{audience}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-8 border-t border-border">
              <p className="text-2xl font-semibold text-foreground">
                Starting Price:{" "}
                <span className="text-primary">₹499 per participant</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Workshops Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-4xl font-bold text-foreground mb-12 text-center">
          Available Workshops
        </h2>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : workshops.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground">
              No workshops available at the moment. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {workshops.map((workshop) => (
              <Card
                key={workshop.id}
                className="overflow-hidden hover:shadow-lg transition-all duration-300 border border-border"
              >
                {workshop.image_url && (
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={workshop.image_url}
                      alt={workshop.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                )}
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-2xl font-bold text-foreground leading-tight">
                    {workshop.title}
                  </h3>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{workshop.duration}</span>
                    </div>
                    <span>|</span>
                    <span>{workshop.format}</span>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      You Will Learn:
                    </h4>
                    <ul className="space-y-2">
                      {workshop.learning_points.map((point, index) => (
                        <li
                          key={index}
                          className="text-sm text-muted-foreground flex items-start gap-2"
                        >
                          <span className="text-primary mt-1">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                    <div className="flex items-start gap-2">
                      <Gift className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-foreground text-sm mb-1">
                          Take Home:
                        </h4>
                        <p className="text-sm text-muted-foreground">{workshop.take_home}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 text-sm">
                    <Target className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Best For:</h4>
                      <p className="text-muted-foreground">{workshop.best_for}</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-3xl font-bold text-primary">₹{workshop.price}</p>
                    </div>
                    <Button
                      onClick={() => handleRegister(workshop)}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                      size="lg"
                    >
                      Register Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Workshops;
