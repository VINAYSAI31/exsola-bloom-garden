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
        <div className="aspect-square overflow-hidden h-128">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>
        <div className="p-6 flex flex-col flex-1">
          <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-green-800 transition-colors">
            {name}
          </h3>
          <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-1">{description}</p>
          <div className="mt-auto">
            <p className="text-2xl font-bold text-gray-900 mb-4">₹{price.toFixed(2)}</p>
            <div
              className="w-full bg-green-800 text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-green-900 transition-colors flex items-center justify-center cursor-pointer"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              View Details
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
