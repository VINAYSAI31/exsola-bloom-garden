import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { RefreshCw, Clock } from "lucide-react";

const ReturnRefund = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Return & Refund Policy
            </h1>
            <p className="text-xl text-gray-600">
              Information about returns, refunds, and exchanges
            </p>
          </div>

          {/* Coming Soon Section */}
          <div className="text-center py-20">
            <div className="max-w-md mx-auto bg-gradient-to-br from-green-50 to-green-100 rounded-3xl p-12 border border-green-200">
              <div className="w-20 h-20 bg-green-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <RefreshCw className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Will Update Soon</h2>
              <p className="text-gray-600 mb-6">
                We're currently preparing our return and refund policy details. 
                Please check back soon for comprehensive information.
              </p>
              <div className="flex items-center justify-center text-sm text-gray-500">
                <Clock className="w-4 h-4 mr-2" />
                Content coming soon
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ReturnRefund;
