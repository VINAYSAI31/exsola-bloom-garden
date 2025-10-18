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
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      toast({
        title: "Please sign in",
        description: "You need to sign in to add items to cart",
        variant: "destructive",
      });
      navigate("/auth");
      setIsAdding(false);
      return;
    }

    const { data: existingItem } = await supabase
      .from("cart_items")
      .select("*")
      .eq("user_id", session.user.id)
      .eq("product_id", id)
      .maybeSingle();

    if (existingItem) {
      const { error } = await supabase
        .from("cart_items")
        .update({ quantity: existingItem.quantity + 1 })
        .eq("id", existingItem.id);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to update cart",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Cart updated",
          description: "Item quantity increased",
        });
      }
    } else {
      const { error } = await supabase
        .from("cart_items")
        .insert({
          user_id: session.user.id,
          product_id: id,
          quantity: 1,
        });

      if (error) {
        toast({
          title: "Error",
          description: "Failed to add to cart",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Added to cart",
          description: `${name} has been added to your cart`,
        });
      }
    }
    setIsAdding(false);
  };

  return (
    <Card className="group overflow-hidden hover:shadow-accent transition-all duration-300" data-aos="fade-up">
      <Link to={`/products/${id}`}>
        <div className="aspect-square overflow-hidden">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>
      </Link>
      <CardContent className="p-4">
        <Link to={`/products/${id}`}>
          <h3 className="text-lg font-semibold mb-2 group-hover:text-accent transition-colors">
            {name}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{description}</p>
        <p className="text-2xl font-bold text-accent">${price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full bg-accent hover:bg-accent/90" 
          onClick={handleAddToCart}
          disabled={isAdding}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          {isAdding ? "Adding..." : "Add to Cart"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
