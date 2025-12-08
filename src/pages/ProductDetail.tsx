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
  const [addingToCart, setAddingToCart] = useState(false);

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

  const handleBuyNow = async () => {
    await handleAddToCart(true);
  };

  const handleAddToCart = async (redirect = false) => {
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      toast({
        title: "Please Sign In",
        description: "You need to be logged in to add items to cart",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    setAddingToCart(true);

    try {
      // Check if item already exists in cart for this user
      const { data: existingItems } = await supabase
        .from("cart_items")
        .select("*")
        .eq("user_id", session.user.id)
        .eq("product_id", product.id)
        .single();

      if (existingItems) {
        // Update quantity
        const { error } = await supabase
          .from("cart_items")
          .update({ quantity: existingItems.quantity + 1 })
          .eq("id", existingItems.id);

        if (error) throw error;
      } else {
        // Insert new item
        const { error } = await supabase
          .from("cart_items")
          .insert({
            user_id: session.user.id,
            product_id: product.id,
            quantity: 1
          });

        if (error) throw error;
      }

      // Dispatch event to update navbar cart count
      window.dispatchEvent(new Event("cart-updated"));

      if (redirect) {
        navigate("/cart");
      } else {
        toast({
          title: "Success",
          description: "Item added to cart",
        });
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast({
        title: "Error",
        description: "Failed to add item to cart",
        variant: "destructive",
      });
    } finally {
      setAddingToCart(false);
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
                      className={`overflow-hidden cursor-pointer transition-all ${selectedImage === img ? "ring-2 ring-accent" : "opacity-60 hover:opacity-100"
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
                <div className="flex gap-4">
                  <Button
                    size="lg"
                    className="flex-1 bg-white text-green-800 border-2 border-green-800 hover:bg-green-50"
                    disabled={!product.in_stock || addingToCart}
                    onClick={() => handleAddToCart(false)}
                  >
                    {addingToCart ? (
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    ) : (
                      <ShoppingCart className="h-5 w-5 mr-2" />
                    )}
                    Add to Cart
                  </Button>

                  <Button
                    size="lg"
                    className="flex-1 bg-green-800 hover:bg-green-900 text-white"
                    disabled={!product.in_stock || addingToCart}
                    onClick={handleBuyNow}
                  >
                    Buy Now
                  </Button>
                </div>
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
