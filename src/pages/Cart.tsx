import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const Cart = () => {
  // Mock cart data
  const cartItems = [
    {
      id: "1",
      name: "Organic Button Mushrooms",
      price: 8.99,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1568471173230-b71caaa0d18f?w=200&h=200&fit=crop",
    },
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 5.99;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.length === 0 ? (
                <Card className="p-8 text-center">
                  <p className="text-muted-foreground mb-4">Your cart is empty</p>
                  <Link to="/products">
                    <Button className="bg-accent hover:bg-accent/90">
                      Continue Shopping
                    </Button>
                  </Link>
                </Card>
              ) : (
                cartItems.map((item) => (
                  <Card key={item.id} className="p-6">
                    <div className="flex gap-6">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-24 h-24 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                        <p className="text-accent font-bold mb-4">${item.price.toFixed(2)}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center border rounded-lg">
                            <Button variant="ghost" size="icon">
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="px-4 py-2 font-semibold">{item.quantity}</span>
                            <Button variant="ghost" size="icon">
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <Button variant="ghost" size="icon" className="text-destructive">
                            <Trash2 className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>

            {/* Order Summary */}
            <div>
              <Card className="p-6 sticky top-24">
                <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-semibold">${shipping.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-4 flex justify-between text-lg">
                    <span className="font-bold">Total</span>
                    <span className="font-bold text-accent">${total.toFixed(2)}</span>
                  </div>
                </div>

                <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground mb-4">
                  Proceed to Checkout
                </Button>
                
                <Link to="/products">
                  <Button variant="outline" className="w-full">
                    Continue Shopping
                  </Button>
                </Link>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
