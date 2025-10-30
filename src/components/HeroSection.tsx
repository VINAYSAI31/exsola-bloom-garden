import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImage from "@/assets/slider-1.jpg";
import mushroomImage from "@/assets/mushroom1.png"; // Mushroom image
import { ChevronRight, Star, Shield, Microscope, Leaf, Users, Mail, Phone, MapPin, ArrowRight, CheckCircle, Award, Zap } from 'lucide-react';
import { useNavigate } from "react-router-dom";


const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section id="home" className="pt-0 bg-gradient-to-br from-green-50 via-white to-green-50 min-h-screen flex items-center">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
              <Award className="w-4 h-4 mr-2" />
              Science-Backed  Mushrooms
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Unlock Nature's
              <span className="text-green-800 block">Most Powerful</span>
              <span className="text-yellow-600">Superfoods</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-lg">
              Revolutionary mushroom grow kits backed by cutting-edge research. 
              Experience the future of wellness with Exsola sciences.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={() => navigate("/products")} className="bg-green-800 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-900 transition-all duration-300 transform hover:scale-105 flex items-center justify-center group">
              Explore Products
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button onClick={() => navigate("/about")} className="border-2 border-green-800 text-green-800 px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-800 hover:text-white transition-all duration-300">
              Learn More
            </button>
          </div>

          {/* <div className="flex items-center space-x-8 pt-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">0+</div>
              <div className="text-sm text-gray-600">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">0%</div>
              <div className="text-sm text-gray-600">Satisfaction Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">5</div>
              <div className="text-sm text-gray-600">Premium Products</div>
            </div>
          </div> */}
        </div>
        
        <div className="relative">
          <div className="relative z-10 bg-white rounded-3xl shadow-2xl p-8">
            <div className="aspect-square bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center">
              <div className="w-48 h-48 bg-green-800 rounded-full flex items-center justify-center">
                <Leaf className="w-24 h-24 text-white" />
              </div>
            </div>
          </div>
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full opacity-20"></div>
          <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-green-600 rounded-full opacity-20"></div>
        </div>
      </div>
    </div>
  </section>
  );
};

export default HeroSection;
