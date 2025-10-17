import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Minus, Plus, ShoppingCart, ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";

// Mock product data - in real app, this would come from database
const productDetails: Record<string, any> = {
  "1": {
    name: "Organic Button Mushrooms",
    price: 8.99,
    image: "https://images.unsplash.com/photo-1568471173230-b71caaa0d18f?w=800&h=800&fit=crop",
    description: "Fresh, organic button mushrooms perfect for any dish",
    longDescription: "Our organic button mushrooms are carefully cultivated using sustainable farming practices. These versatile mushrooms are perfect for salads, pasta, stir-fries, and more. Rich in nutrients and low in calories, they're an excellent addition to any healthy diet.",
    stock: 45,
    weight: "250g",
    nutrition: {
      calories: 22,
      protein: "3g",
      carbs: "3g",
      fiber: "1g",
    },
  },
};

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);

  const product = productDetails[id || "1"] || productDetails["1"];

  const handleQuantityChange = (delta: number) => {
    setQuantity(Math.max(1, Math.min(product.stock, quantity + delta)));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Back Button */}
          <Link to="/products">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Products
            </Button>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div>
              <Card className="overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-auto object-cover"
                />
              </Card>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
                <p className="text-3xl font-bold text-accent mb-4">
                  ${product.price.toFixed(2)}
                </p>
                <p className="text-muted-foreground mb-2">
                  Weight: {product.weight}
                </p>
                <p className="text-muted-foreground">
                  {product.stock > 0 ? (
                    <span className="text-green-600">In Stock ({product.stock} available)</span>
                  ) : (
                    <span className="text-red-600">Out of Stock</span>
                  )}
                </p>
              </div>

              <div className="border-t border-b py-6">
                <h2 className="text-xl font-semibold mb-4">Description</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {product.longDescription}
                </p>
              </div>

              {/* Nutrition Info */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Nutrition Facts (per 100g)</h2>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-muted p-3 rounded">
                    <p className="text-muted-foreground">Calories</p>
                    <p className="font-semibold">{product.nutrition.calories}</p>
                  </div>
                  <div className="bg-muted p-3 rounded">
                    <p className="text-muted-foreground">Protein</p>
                    <p className="font-semibold">{product.nutrition.protein}</p>
                  </div>
                  <div className="bg-muted p-3 rounded">
                    <p className="text-muted-foreground">Carbs</p>
                    <p className="font-semibold">{product.nutrition.carbs}</p>
                  </div>
                  <div className="bg-muted p-3 rounded">
                    <p className="text-muted-foreground">Fiber</p>
                    <p className="font-semibold">{product.nutrition.fiber}</p>
                  </div>
                </div>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="font-semibold">Quantity:</span>
                  <div className="flex items-center border rounded-lg">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="px-6 py-2 font-semibold">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= product.stock}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <Button 
                  size="lg" 
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                  disabled={product.stock === 0}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart - ${(product.price * quantity).toFixed(2)}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
