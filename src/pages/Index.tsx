import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { ChevronRight, Star, Shield, Microscope, Leaf, Users, Mail, Phone, MapPin, ArrowRight, CheckCircle, Award, Zap } from 'lucide-react';


const Index = () => {
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out",
    });
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("in_stock", true)
      .order("created_at", { ascending: false })
      .limit(4);

    if (!error && data) {
      setFeaturedProducts(data);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <FeaturedSection />

        {/* Featured Products Section */}
        <section id="products" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Premium Product Line
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our scientifically-formulated mushroom products designed to optimize your health and performance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Product 1 */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-green-200 transition-colors">
                <Leaf className="w-8 h-8 text-green-800" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Premium Extracts</h3>
              <p className="text-gray-600 mb-6">
                Highly concentrated liquid extracts with maximum bioavailability. Perfect for daily wellness routines.
              </p>
              <div className="space-y-2 mb-6">
                <div className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  10:1 Concentration Ratio
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  Third-Party Lab Tested
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  Organic Certified
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-900">$89</span>
                <button  onClick={() => navigate("/products")}  className="bg-green-800 text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-green-900 transition-colors">
                  Shop Now
                </button>
              </div>
            </div>

            {/* Product 2 */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-yellow-200 transition-colors">
                <Star className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Superfood Powders</h3>
              <p className="text-gray-600 mb-6">
                Versatile powders perfect for smoothies, coffee, and recipes. Easy integration into your lifestyle.
              </p>
              <div className="space-y-2 mb-6">
                <div className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  Dual Extraction Process
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  30-Day Supply
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  Unflavored Option
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-900">$59</span>
                <button  onClick={() => navigate("/products")} className="bg-green-800 text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-green-900 transition-colors">
                  Shop Now
                </button>
              </div>
            </div>

            {/* Product 3 */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-purple-200 transition-colors">
                <Microscope className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Grow Kits</h3>
              <p className="text-gray-600 mb-6">
                Complete growing kits for cultivating your own premium mushrooms at home. Educational and rewarding.
              </p>
              <div className="space-y-2 mb-6">
                <div className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  Ready-to-Grow Setup
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  Detailed Instructions
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  Multiple Varieties
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-900">$39</span>
                <button  onClick={() => navigate("/products")} className="bg-green-800 text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-green-900 transition-colors">
                  Shop Now
                </button>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
          <button
      onClick={() => navigate("/products")}
      className="border-2 border-green-800 text-green-800 px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-800 hover:text-white transition-all duration-300"
    >
      View All Products
    </button>
          </div>
        </div>
      </section>

        <HowWeMake />
        {/* <HealthBenefits /> */}

        {/* About Section */}
        <section id="about" className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-white text-4xl lg:text-5xl font-bold mb-6">
              The EXORA Story
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Founded by passionate researchers and wellness experts, EXORA is revolutionizing how people 
              experience the power of functional mushrooms.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white ">Our Mission</h3>
              <p className="text-gray-300">
                To make the profound health benefits of premium mushrooms accessible to everyone through 
                science-backed products and education.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Leaf className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Our Values</h3>
              <p className="text-gray-300">
                Sustainability, transparency, and scientific integrity guide everything we do. We believe 
                in the power of nature enhanced by knowledge.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Our Future</h3>
              <p className="text-gray-300">
                Leading the next generation of functional foods and supplements through continuous research 
                and innovation in mushroom science.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id="contact" className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Get in Touch
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Have questions about our products or want to learn more about mushroom science? 
              We'd love to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <Mail className="w-6 h-6 text-green-800 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Us</h3>
                  <p className="text-gray-600">hello@exoralabs.com</p>
                  <p className="text-gray-600">research@exoralabs.com</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <Phone className="w-6 h-6 text-green-800 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Call Us</h3>
                  <p className="text-gray-600">+1 (555) 123-EXORA</p>
                  <p className="text-gray-600">Mon-Fri 9AM-6PM PST</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <MapPin className="w-6 h-6 text-green-800 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Visit Us</h3>
                  <p className="text-gray-600">123 Innovation Drive</p>
                  <p className="text-gray-600">San Francisco, CA 94107</p>
                </div>
              </div>
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-green-800 focus:ring-2 focus:ring-green-100 outline-none transition-all"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-green-800 focus:ring-2 focus:ring-green-100 outline-none transition-all"
                />
              </div>
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-green-800 focus:ring-2 focus:ring-green-100 outline-none transition-all"
              />
              <textarea
                rows={4}
                placeholder="Your Message"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-green-800 focus:ring-2 focus:ring-green-100 outline-none transition-all resize-none"
              ></textarea>
              <button className="w-full bg-green-800 text-white py-4 rounded-lg text-lg font-semibold hover:bg-green-900 transition-all duration-300 transform hover:scale-[1.02]">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
