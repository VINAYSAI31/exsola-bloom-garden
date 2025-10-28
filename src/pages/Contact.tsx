import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out",
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Header */}
        <section className="py-20 section-gradient">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6" data-aos="fade-up">
              Contact Us
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="100">
              Have questions? We'd love to hear from you
            </p>
          </div>
        </section>

        {/* Contact Info and Form */}
        <section className="py-20 bg-card">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              {/* Contact Info Cards */}
              <Card data-aos="fade-up" data-aos-delay="100">
                <CardHeader>
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mb-4">
                    <Mail className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <CardTitle>Email Us</CardTitle>
                  <CardDescription>Send us an email anytime</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground">exsolasciences@gmail.com</p>
                 
                </CardContent>
              </Card>

              <Card data-aos="fade-up" data-aos-delay="200">
                <CardHeader>
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mb-4">
                    <Phone className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <CardTitle>Call Us</CardTitle>
                  <CardDescription>Mon-Fri 9am-6pm EST</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground">+91 9492987157</p>
                </CardContent>
              </Card>

              <Card data-aos="fade-up" data-aos-delay="300">
                <CardHeader>
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mb-4">
                    <MapPin className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <CardTitle>Visit Us</CardTitle>
                  <CardDescription>Come see our farm</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground">Roma Enclave 3, Road No.5

</p>
                  <p className="text-foreground">Badangpet, Balapur Mandal, Ranga Reddy District, Hyderabad 500058</p>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <Card className="max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="400">
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Your name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="you@example.com" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="How can we help?" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Tell us more about your inquiry..." 
                      rows={6}
                      required 
                    />
                  </div>
                  <Button type="submit" className="w-full bg-accent hover:bg-accent/90">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
