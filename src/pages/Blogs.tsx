import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, Users, Calendar, Clock } from "lucide-react";

const Blogs = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Knowledge Hub
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our comprehensive collection of mushroom insights, research findings, and educational workshops
            </p>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mb-16">
            <Link to="/blogs">
              <Button 
                variant="default" 
                size="lg"
                className="bg-green-800 hover:bg-green-900 text-white px-8 py-3 rounded-full"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Blogs
              </Button>
            </Link>
            <Link to="/learn">
              <Button 
                variant="outline" 
                size="lg"
                className="border-green-800 text-green-800 hover:bg-green-800 hover:text-white px-8 py-3 rounded-full"
              >
                <Users className="w-5 h-5 mr-2" />
                Learn
              </Button>
            </Link>
          </div>

          {/* Coming Soon Section */}
          <div className="text-center py-20">
            <div className="max-w-md mx-auto bg-gradient-to-br from-green-50 to-green-100 rounded-3xl p-12 border border-green-200">
              <div className="w-20 h-20 bg-green-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Coming Soon</h2>
              <p className="text-gray-600 mb-6">
                We're preparing amazing content about mushroom cultivation, health benefits, and scientific research.
              </p>
              <div className="flex items-center justify-center text-sm text-gray-500">
                <Clock className="w-4 h-4 mr-2" />
                Stay tuned for updates
              </div>
            </div>
          </div>

          {/* Feature Preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6 text-green-800" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Research Articles</h3>
              <p className="text-gray-600 text-sm">
                In-depth scientific articles about mushroom benefits and cultivation techniques
              </p>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-green-800" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Workshops</h3>
              <p className="text-gray-600 text-sm">
                Interactive learning sessions and hands-on mushroom growing workshops
              </p>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-6 h-6 text-green-800" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Events</h3>
              <p className="text-gray-600 text-sm">
                Community events, webinars, and educational sessions about mushrooms
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Blogs;
