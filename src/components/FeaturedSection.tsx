import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import featuredImage from "@/assets/featured-mushrooms.jpg";
import { ChevronRight, Star, Shield, Microscope, Leaf, Globe,Users, Mail, Phone, MapPin, ArrowRight, CheckCircle, Award, Zap } from 'lucide-react';


const FeaturedSection = () => {
  return (
    <section className="py-16 bg-gray-900 text-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 text-center">
        <div className="flex flex-col items-center space-y-3">
          <Shield className="w-12 h-12 text-yellow-400" />
          <h3 className="font-semibold text-white"> Lab Cultured</h3>
          <p className="text-gray-300 text-sm">
            Every spawn is developed in sterile lab conditions for contamination-free growth and consistent results.
          </p>
        </div>
  
        <div className="flex flex-col items-center space-y-3">
          <Microscope className="w-12 h-12 text-yellow-400" />
          <h3 className="font-semibold text-white"> Research-Backed</h3>
          <p className="text-gray-300 text-sm">
            Each kit is designed using the latest cultivation science for faster colonization and higher yields.
          </p>
        </div>
  
        <div className="flex flex-col items-center space-y-3">
          <Leaf className="w-12 h-12 text-yellow-400" />
          <h3 className="font-semibold text-white"> 100% Natural</h3>
          <p className="text-gray-300 text-sm">
            Made from pure, organic substrates — no chemicals, pesticides, or synthetic nutrients.
          </p>
        </div>
  
        <div className="flex flex-col items-center space-y-3">
          <Zap className="w-12 h-12 text-yellow-400" />
          <h3 className="font-semibold text-white"> Maximum Performance</h3>
          <p className="text-gray-300 text-sm">
            Optimized substrate blend ensures vigorous mycelium growth and abundant harvests.
          </p>
        </div>
  
        <div className="flex flex-col items-center space-y-3">
          <Globe className="w-12 h-12 text-yellow-400" />
          <h3 className="font-semibold text-white"> Sustainably Crafted</h3>
          <p className="text-gray-300 text-sm">
            Each kit is created using eco-friendly materials and locally sourced substrates — minimizing waste, maximizing growth.
          </p>
        </div>
      </div>
    </div>
  </section>
  
  );
};

export default FeaturedSection;
