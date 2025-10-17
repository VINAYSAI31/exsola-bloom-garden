import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

const ProductCard = ({ id, name, price, image, description }: ProductCardProps) => {
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
        <Button className="w-full bg-accent hover:bg-accent/90">
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
