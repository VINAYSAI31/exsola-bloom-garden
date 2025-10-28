import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ArrowLeft, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [product, setProduct] = useState<any>(null);
  const [images, setImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    const { data: productData, error: productError } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (productError || !productData) {
      toast({
        title: "Error",
        description: "Product not found",
        variant: "destructive",
      });
      navigate("/products");
      return;
    }

    setProduct(productData);

    // Fetch product images
    const { data: imageData } = await supabase
      .from("product_images")
      .select("image_url")
      .eq("product_id", id)
      .order("display_order", { ascending: true });

    const productImages = imageData?.map(img => img.image_url) || [];
    
    // If no images in product_images table, use main image_url
    if (productImages.length === 0 && productData.image_url) {
      productImages.push(productData.image_url);
    }

    setImages(productImages);
    setSelectedImage(productImages[0] || "");
    setLoading(false);
  };

  const handleBuyNow = () => {
    if (product?.amazon_link) {
      window.open(product.amazon_link, '_blank');
    } else {
      toast({
        title: "Coming Soon",
        description: "This product will be available for purchase soon!",
        variant: "default",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-accent" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-lg text-muted-foreground">Product not found</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <Link to="/products">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Products
            </Button>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images - Amazon style vertical on left */}
            <div className="flex gap-4">
              {/* Thumbnail images vertical column */}
              {images.length > 1 && (
                <div className="flex flex-col gap-3 w-20">
                  {images.map((img, idx) => (
                    <Card 
                      key={idx}
                      className={`overflow-hidden cursor-pointer transition-all ${
                        selectedImage === img ? "ring-2 ring-accent" : "opacity-60 hover:opacity-100"
                      }`}
                      onClick={() => setSelectedImage(img)}
                    >
                      <img 
                        src={img} 
                        alt={`${product.name} view ${idx + 1}`} 
                        className="w-full h-20 object-cover"
                      />
                    </Card>
                  ))}
                </div>
              )}

              {/* Main image */}
              <Card className="overflow-hidden flex-1">
                <img 
                  src={selectedImage || images[0] || product.image_url} 
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
                  ₹{product.price.toFixed(2)}
                </p>
                {product.category && (
                  <p className="text-muted-foreground mb-2">
                    Category: {product.category}
                  </p>
                )}
                <p className="text-muted-foreground">
                  {product.in_stock ? (
                    <span className="text-green-600">In Stock</span>
                  ) : (
                    <span className="text-red-600">Out of Stock</span>
                  )}
                </p>
              </div>

              <div className="border-t border-b py-6">
                <h2 className="text-xl font-semibold mb-4">Description</h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {product.description}
                </p>
              </div>

              {/* Buy Now */}
              <div className="space-y-4">
                <Button 
                  size="lg" 
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                  disabled={!product.in_stock}
                  onClick={handleBuyNow}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Buy Now on Amazon - ₹{product.price.toFixed(2)}
                </Button>
                <p className="text-sm text-muted-foreground text-center">
                  You will be redirected to Amazon to complete your purchase
                </p>
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
