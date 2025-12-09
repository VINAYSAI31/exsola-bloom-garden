import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;

}

const ProductCard = ({ id, name, price, image, description }: ProductCardProps) => {
  const { toast } = useToast();

  const navigate = useNavigate();

  const handleViewDetails = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent parent Link from triggering if nested
    navigate(`/products/${id}`);
  };

  return (
    <Link to={`/products/${id}`} className="block h-full">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group h-full flex flex-col">
        <div className="aspect-square overflow-hidden bg-gray-50 flex items-center justify-center">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4 sm:p-6 flex flex-col flex-1">
          <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-2 group-hover:text-green-800 transition-colors line-clamp-2">
            {name}
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 line-clamp-2 flex-1">{description}</p>
          <div className="mt-auto">
            <p className="text-lg sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">₹{price.toFixed(2)}</p>
            <div
              className="w-full bg-green-800 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-semibold hover:bg-green-900 transition-colors flex items-center justify-center cursor-pointer"
            >
              <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
              View Details
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
