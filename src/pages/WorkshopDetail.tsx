import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, Clock, Users, CheckCircle, Gift } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

interface Workshop {
  id: string;
  title: string;
  duration: string;
  format: string;
  learning_points: string[];
  take_home: string;
  best_for: string;
  price: number;
  image_url: string | null;
  created_at: string;
}

const WorkshopDetail = () => {
  const { id } = useParams();
  const [workshop, setWorkshop] = useState<Workshop | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchWorkshop();
  }, [id]);

  const fetchWorkshop = async () => {
    try {
      const { data, error } = await supabase
        .from("workshops")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      setWorkshop(data);
    } catch (error) {
      console.error("Error fetching workshop:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-20 flex items-center justify-center min-h-[60vh]">
          <p className="text-xl text-gray-600">Loading...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!workshop) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-20 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Workshop not found</h2>
            <Link to="/blogs">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blogs
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFCFA]">
      <Navbar />
      
      <div className="pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Link to="/blogs" className="inline-flex items-center text-green-800 hover:text-green-900 mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Knowledge Hub
          </Link>

          {/* Hero Image */}
          {workshop.image_url && (
            <div className="mb-8 rounded-2xl overflow-hidden">
              <img
                src={workshop.image_url}
                alt={workshop.title}
                className="w-full h-[400px] object-cover"
              />
            </div>
          )}

          {/* Title Section */}
          <div className="mb-8">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              {workshop.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-gray-600">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{workshop.duration}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>{workshop.format}</span>
              </div>
            </div>
          </div>

          {/* Price Card */}
          <div className="bg-white rounded-2xl p-8 mb-8 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">Workshop Fee</p>
                <p className="text-4xl font-bold text-green-800">₹{workshop.price}</p>
              </div>
              <Button size="lg" className="bg-green-800 hover:bg-green-900">
                Register Now
              </Button>
            </div>
          </div>

          {/* Learning Points */}
          <div className="bg-white rounded-2xl p-8 mb-8 border border-gray-200 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-green-800" />
              What You Will Learn
            </h2>
            <ul className="space-y-4">
              {workshop.learning_points.map((point, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-green-800 font-semibold text-sm">{index + 1}</span>
                  </div>
                  <p className="text-gray-700 text-lg">{point}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Take Home */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 mb-8 border border-green-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Gift className="w-6 h-6 text-green-800" />
              Take Home
            </h2>
            <p className="text-gray-700 text-lg">{workshop.take_home}</p>
          </div>

          {/* Best For */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Best For</h2>
            <p className="text-gray-700 text-lg">{workshop.best_for}</p>
          </div>

          {/* CTA Section */}
          <div className="mt-12 text-center">
            <Button size="lg" className="bg-green-800 hover:bg-green-900 text-lg px-12 py-6">
              Reserve Your Spot Now
            </Button>
            <p className="text-sm text-gray-600 mt-4">
              Limited seats available • Small batch training
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default WorkshopDetail;
