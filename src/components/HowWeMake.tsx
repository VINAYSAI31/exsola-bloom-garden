import howWeImage from "@/assets/how-we-make.jpg";
import { ChevronRight, Star, Shield, Microscope, Leaf, Users, Mail, Phone, MapPin, ArrowRight, CheckCircle, Award, Zap } from 'lucide-react';


const HowWeMake = () => {
  return (
    <section id="science" className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Backed by
            <span className="text-green-800 block">Cutting-Edge Science</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            At exola Labs, we combine traditional wisdom with modern scientific research to create 
            the most effective mushroom supplements on the market.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Microscope className="w-6 h-6 text-green-800" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Advanced Extraction</h3>
                <p className="text-gray-600">Proprietary dual-extraction methods preserve and concentrate bioactive compounds for maximum efficacy.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-green-800" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Quality Assurance</h3>
                <p className="text-gray-600">Every batch undergoes rigorous testing for purity, potency, and safety by certified third-party laboratories.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Award className="w-6 h-6 text-green-800" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Research Partnership</h3>
                <p className="text-gray-600">Collaborating with leading universities and research institutions to advance mushroom science.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="relative">
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 h-96 flex items-center justify-center">
            <div className="text-center">
              <Microscope className="w-24 h-24 text-green-800 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">exola Labs</h3>
              <p className="text-gray-600">Where Science Meets Nature</p>
            </div>
          </div>
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-yellow-200 rounded-full opacity-30"></div>
          <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-green-200 rounded-full opacity-40"></div>
        </div>
      </div>
    </div>
  </section>
  );
};

export default HowWeMake;
