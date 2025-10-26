import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { ChevronRight, Star, Shield, Microscope, Leaf, Users, Mail, Phone, MapPin, ArrowRight, CheckCircle, Award, Zap } from 'lucide-react';


const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center mb-4">
            <Leaf className="h-8 w-8 text-green-400" />
            <span className="ml-2 text-2xl font-bold">EXORA</span>
          </div>
          <p className="text-gray-300 mb-4 max-w-md">
            Revolutionizing wellness through premium mushroom products backed by cutting-edge science and research.
          </p>
          <div className="flex space-x-4">
            <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors cursor-pointer">
              <span className="text-sm font-bold">f</span>
            </div>
            <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors cursor-pointer">
              <span className="text-sm font-bold">t</span>
            </div>
            <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors cursor-pointer">
              <span className="text-sm font-bold">in</span>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">Products</h3>
          <ul className="space-y-2 text-gray-300">
            <li><a href="#" className="hover:text-green-400 transition-colors">Extracts</a></li>
            <li><a href="#" className="hover:text-green-400 transition-colors">Powders</a></li>
            <li><a href="#" className="hover:text-green-400 transition-colors">Grow Kits</a></li>
            <li><a href="#" className="hover:text-green-400 transition-colors">Bundles</a></li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">Company</h3>
          <ul className="space-y-2 text-gray-300">
            <li><a href="#" className="hover:text-green-400 transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-green-400 transition-colors">Research</a></li>
            <li><a href="#" className="hover:text-green-400 transition-colors">Blog</a></li>
            <li><a href="#" className="hover:text-green-400 transition-colors">Contact</a></li>
          </ul>
        </div>
      </div>
      
      <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-300">
        <p>&copy; 2025 EXORA Labs. All rights reserved. | Privacy Policy | Terms of Service</p>
      </div>
    </div>
  </footer>
  );
};

export default Footer;
