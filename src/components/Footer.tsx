import { Link } from "react-router-dom";
import { Facebook, Instagram } from "lucide-react";
import { ChevronRight, Star, Shield, Microscope, Leaf, Users, Mail, Phone, MapPin, ArrowRight, CheckCircle, Award, Zap } from 'lucide-react';


const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center mb-4">
           
            <span className="ml-2 text-2xl font-bold">EXSOLA</span>
          </div>
          <p className="text-gray-300 mb-4 max-w-md">
            We grow what earth leaves behind
          </p>
          <div className="flex space-x-4">
            <a href="https://www.facebook.com/share/1D9FDhyc2m/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer">
              <Facebook className="w-5 h-5 text-blue-600" />
            </a>
            <a href="https://www.linkedin.com/company/exsola/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer">
              <svg className="w-5 h-5 text-blue-700" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a href="https://www.instagram.com/exsola_sciences?igsh=MWUzZzk5cHJmb21y" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer">
              <Instagram className="w-5 h-5 text-pink-600" />
            </a>
            <a href="https://wa.me/message/XIEOTDRTCG4OO1" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </a>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
          <ul className="space-y-2 text-gray-300">
            <li><Link to="/products" className="hover:text-green-400 transition-colors">Shop</Link></li>
            <li><Link to="/terms-conditions" className="hover:text-green-400 transition-colors">Terms and Conditions</Link></li>
            <li><Link to="/return-refund" className="hover:text-green-400 transition-colors">Return and Refund Policy</Link></li>
            <li><Link to="/faq" className="hover:text-green-400 transition-colors">FAQ</Link></li>
            <li><Link to="/store-location" className="hover:text-green-400 transition-colors">Store Location</Link></li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">Company</h3>
          <ul className="space-y-2 text-gray-300">
            <li><Link to="/about" className="hover:text-green-400 transition-colors">About Us</Link></li>
            <li><Link to="/blogs" className="hover:text-green-400 transition-colors">Blogs</Link></li>
            <li><Link to="/events" className="hover:text-green-400 transition-colors">Events</Link></li>
            <li><Link to="/learn" className="hover:text-green-400 transition-colors">Learn</Link></li>
            <li><Link to="/contact" className="hover:text-green-400 transition-colors">Contact</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-300">
        <p>&copy; 2025 exsola sciences. All rights reserved. | Privacy Policy | Terms of Service</p>
      </div>
    </div>
  </footer>
  );
};

export default Footer;
