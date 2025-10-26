import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import featuredImage from "@/assets/featured-mushrooms.jpg";
import { ChevronRight, Star, Shield, Microscope, Leaf, Users, Mail, Phone, MapPin, ArrowRight, CheckCircle, Award, Zap } from 'lucide-react';


const FeaturedSection = () => {
  return (
    <section className="py-16 bg-gray-900 text-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
        <div className="flex flex-col items-center space-y-3">
          <Shield className="w-12 h-12 text-yellow-400" />
          <h3 className="font-semibold text-white">Lab Tested</h3>
          <p className="text-gray-300 text-sm">Every product rigorously tested for purity and potency</p>
        </div>
        <div className="flex flex-col items-center space-y-3">
          <Microscope className="w-12 h-12 text-yellow-400" />
          <h3 className="font-semibold text-white">Research-Backed</h3>
          <p className="text-gray-300 text-sm">Formulated using the latest scientific discoveries</p>
        </div>
        <div className="flex flex-col items-center space-y-3">
          <Leaf className="w-12 h-12 text-yellow-400" />
          <h3 className="font-semibold text-white">100% Natural</h3>
          <p className="text-gray-300 text-sm">Pure, organic ingredients with no artificial additives</p>
        </div>
        <div className="flex flex-col items-center space-y-3">
          <Zap className="w-12 h-12 text-yellow-400" />
          <h3 className="font-semibold text-white">Maximum Potency</h3>
          <p className="text-gray-300 text-sm">Concentrated extracts for optimal bioavailability</p>
        </div>
      </div>
    </div>
  </section>

  );
};

export default FeaturedSection;
