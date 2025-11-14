import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, MapPin } from "lucide-react";

interface Event {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  event_date: string | null;
  location: string | null;
  created_at: string;
}

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("event_date", { ascending: false, nullsFirst: false })
        .order("created_at", { ascending: false });

      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl font-bold mb-6 text-foreground">
                Community Events & Markets
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Join us at vibrant markets and eco-conscious events where we connect with the community, 
                share knowledge, and celebrate the world of mushrooms.
              </p>
            </div>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg max-w-none">
                <h2 className="text-3xl font-bold mb-6 text-foreground">
                  We Love Being Part of the Community
                </h2>
                <div className="space-y-6 text-muted-foreground">
                  <p className="leading-relaxed">
                    You may have seen us at some of the most lively and eco-conscious markets and popup events, 
                    where we connect with people, share knowledge, and celebrate the world of mushrooms.
                  </p>
                  
                  <div className="bg-primary/5 p-6 rounded-lg border border-border">
                    <h3 className="text-xl font-semibold mb-4 text-foreground">
                      Past Events We've Participated In:
                    </h3>
                    <ul className="space-y-2">
                      <li>✓ SoulSante</li>
                      <li>✓ LaLaland Festival</li>
                      <li>✓ BYOB Markets</li>
                      <li>✓ Vegan Market</li>
                      <li>✓ Adivaram Angadi (Our Sacred Space)</li>
                      <li>✓ Organic Bazaar (Good Seeds)</li>
                      <li>✓ Many more artisan and sustainable popup markets</li>
                    </ul>
                  </div>

                  <p className="leading-relaxed">
                    These events allow us to meet you directly, understand your needs, answer your questions, 
                    and introduce more people to the benefits and possibilities of mushrooms.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Events Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center text-foreground">
              Upcoming & Recent Events
            </h2>
            
            {loading ? (
              <div className="text-center text-muted-foreground">Loading events...</div>
            ) : events.length === 0 ? (
              <div className="text-center text-muted-foreground max-w-2xl mx-auto">
                <p className="text-lg">
                  No events scheduled at the moment. Check back soon for upcoming community events and market appearances!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-border"
                  >
                    {event.image_url && (
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={event.image_url}
                          alt={event.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-2xl font-bold mb-3 text-foreground">
                        {event.title}
                      </h3>
                      
                      <div className="flex flex-col gap-2 mb-4 text-sm text-muted-foreground">
                        {event.event_date && (
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(event.event_date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}</span>
                          </div>
                        )}
                        {event.location && (
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>{event.location}</span>
                          </div>
                        )}
                      </div>

                      <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                        {event.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Events;
