import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Truck, Banknote, MapPin, Plus } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const Checkout = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);
    const [cartItems, setCartItems] = useState<any[]>([]);
    const [subtotal, setSubtotal] = useState(0);
    const [user, setUser] = useState<any>(null);
    const [savedAddresses, setSavedAddresses] = useState<any[]>([]);
    const [selectedAddressId, setSelectedAddressId] = useState<string>("new");
    const [isAddressLoading, setIsAddressLoading] = useState(true);

    // Load Razorpay Script
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const [formData, setFormData] = useState({
        full_name: "",
        street: "",
        city: "",
        state: "",
        zip_code: "",
        country: "India",
        payment_method: "online"
    });
    const [showCODAlert, setShowCODAlert] = useState(false);

    useEffect(() => {
        checkUser();
    }, []);

    const checkUser = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
            navigate("/auth");
            return;
        }
        setUser(session.user);
        fetchCart(session.user.id);
        fetchAddresses(session.user.id);
    };

    const fetchAddresses = async (userId: string) => {
        const { data, error } = await supabase
            .from("addresses")
            .select("*")
            .eq("user_id", userId)
            .order("is_default", { ascending: false }); // Default first

        if (!error && data) {
            setSavedAddresses(data);
            // Auto-select default address if exists
            if (data.length > 0) {
                const defaultAddr = data.find(a => a.is_default) || data[0];
                setSelectedAddressId(defaultAddr.id);
            }
        }
        setIsAddressLoading(false);
    };

    const fetchCart = async (userId: string) => {
        const { data, error } = await supabase
            .from("cart_items")
            .select(`
        id,
        product_id,
        quantity,
        products (
          id,
          name,
          price,
          image_url
        )
      `)
            .eq("user_id", userId);

        if (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "Failed to load cart",
                variant: "destructive",
            });
        } else {
            if (data.length === 0) {
                navigate("/cart");
                return;
            }
            setCartItems(data);
            const total = data.reduce((sum, item) => sum + (Number(item.products.price) * item.quantity), 0);
            setSubtotal(total);
        }
        setLoading(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handlePlaceOrder = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.payment_method) {
            toast({
                title: "Payment Method Required",
                description: "Please select a payment method to proceed.",
                variant: "destructive"
            });
            return;
        }

        setProcessing(true);

        try {
            const shipping = 49; // Standard shipping
            const totalAmount = subtotal + shipping;

            // 1. Check/Create Address Record
            let addressId = null;

            if (selectedAddressId !== "new") {
                addressId = selectedAddressId;
            } else {
                // Check for identical existing address to avoid unnecessary dups
                const { data: existingAddresses } = await supabase
                    .from("addresses")
                    .select("id")
                    .eq("user_id", user.id)
                    .eq("street", formData.street)
                    .eq("city", formData.city)
                    .eq("state", formData.state)
                    .eq("zip_code", formData.zip_code)
                    .eq("country", formData.country);

                if (existingAddresses && existingAddresses.length > 0) {
                    addressId = existingAddresses[0].id;
                } else {
                    // Create new address
                    const { data: addressData, error: addressError } = await supabase
                        .from("addresses")
                        .insert({
                            user_id: user.id,
                            label: "Shipping",
                            street: formData.street,
                            city: formData.city,
                            state: formData.state,
                            zip_code: formData.zip_code,
                            country: formData.country,
                            is_default: savedAddresses.length === 0 // Make default if it's the first one
                        })
                        .select()
                        .single();

                    if (addressError) throw addressError;
                    addressId = addressData.id;
                }
            }

            // 2. Create Order (Initial State)
            const { data: orderData, error: orderError } = await supabase
                .from("orders")
                .insert({
                    user_id: user.id,
                    status: 'pending_payment',
                    total: totalAmount
                })
                .select()
                .single();

            if (orderError) throw orderError;

            // 3. Create Order Items
            const orderItems = cartItems.map(item => ({
                order_id: orderData.id,
                product_id: item.product_id,
                quantity: item.quantity,
                price: item.products.price
            }));

            const { error: itemsError } = await supabase
                .from("order_items")
                .insert(orderItems);

            if (itemsError) throw itemsError;

            // 4. Handle Payment
            if (formData.payment_method === 'online') {
                const options = {
                    key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Use environment variable
                    amount: Math.round(totalAmount * 100), // Amount in paise
                    currency: "INR",
                    name: "Exsola",
                    description: "Purchase from Exsola",
                    order_id: "", // In a real backend, you'd generate this from Razorpay API
                    handler: async function (response: any) {
                        // Payment Success
                        try {
                            const { data, error } = await supabase.functions.invoke('order-confirmation', {
                                body: {
                                    order_id: orderData.id,
                                    payment_id: response.razorpay_payment_id
                                }
                            });

                            if (error) throw error;

                            finalizeOrder(orderData.id);
                        } catch (err: any) {
                            console.error("Verification failed", err);
                            toast({
                                title: "Payment Verification Failed",
                                description: "We received your payment but failed to verify it automatically. Please contact support.",
                                variant: "destructive"
                            });
                            // Still finalize locally so user isn't stuck, admin checks later
                            finalizeOrder(orderData.id);
                        }
                    },
                    modal: {
                        ondismiss: async function () {
                            setProcessing(false);
                            toast({
                                title: "Payment Cancelled",
                                description: "You cancelled the payment process.",
                                variant: "default"
                            });

                            // Cancel/Delete the pending order since payment was not completed
                            await supabase.from("orders").delete().eq("id", orderData.id);

                            navigate("/cart");
                        }
                    },
                    prefill: {
                        name: formData.full_name,
                        email: user.email,
                        contact: "" // Could collect phone number
                    },
                    theme: {
                        color: "#166534"
                    }
                };

                const rzp = new (window as any).Razorpay(options);
                rzp.open();
                rzp.on('payment.failed', function (response: any) {
                    toast({
                        title: "Payment Failed",
                        description: response.error.description,
                        variant: "destructive"
                    });
                    setProcessing(false);
                });
            }

        } catch (error: any) {
            console.error("Order failed:", error);
            handleOrderError(error);
        }
        // Note: setProcessing(false) is called in finalizeOrder or handleOrderError
    };

    const finalizeOrder = async (orderId: string) => {
        try {
            // Clear Cart
            const { error: clearError } = await supabase
                .from("cart_items")
                .delete()
                .eq("user_id", user.id);

            if (clearError) throw clearError;

            // Email Confirmation Stub
            console.log(`[Email Mock] Sending confirmation email to ${user.email} for Order #${orderId}`);
            toast({
                title: "Order Placed Successfully!",
                description: `Confirmation sent to ${user.email}. Order #${orderId.slice(0, 8)}`,
            });

            window.dispatchEvent(new Event("cart-updated"));
            navigate("/");
        } catch (error) {
            console.error("Finalization error:", error);
            toast({ // Even if finalization fails, order was created. user should contact support.
                title: "Order Created",
                description: "Order placed but we encountered an issue clearing your cart. Please contact support.",
                variant: "default"
            });
            navigate("/");
        } finally {
            setProcessing(false);
        }
    };

    const handleOrderError = (error: any) => {
        toast({
            title: "Order Failed",
            description: error.message || "Failed to place order. Please try again.",
            variant: "destructive",
        });
        setProcessing(false);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">Checkout</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Shipping Form */}
                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Shipping Details</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-4">
                                    {/* Address Selection Section */}
                                    <div className="space-y-4 mb-6">
                                        <Label className="text-lg font-semibold">Delivery Address</Label>

                                        {!isAddressLoading && savedAddresses.length > 0 && (
                                            <div className="grid gap-4">
                                                {savedAddresses.map((addr) => (
                                                    <div
                                                        key={addr.id}
                                                        className={`flex items-start space-x-4 border p-4 rounded-lg cursor-pointer transition-colors ${selectedAddressId === addr.id ? 'border-primary bg-primary/5' : 'hover:bg-accent/5'}`}
                                                        onClick={() => setSelectedAddressId(addr.id)}
                                                    >
                                                        <div className={`mt-1 h-4 w-4 rounded-full border border-primary flex items-center justify-center ${selectedAddressId === addr.id ? 'bg-primary' : ''}`}>
                                                            {selectedAddressId === addr.id && <div className="h-2 w-2 rounded-full bg-white" />}
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-2">
                                                                <span className="font-semibold">{addr.label}</span>
                                                                {addr.is_default && <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">Default</span>}
                                                            </div>
                                                            <p className="text-sm text-gray-600 mt-1">{addr.street}</p>
                                                            <p className="text-sm text-gray-600">{addr.city}, {addr.state} {addr.zip_code}</p>
                                                            <p className="text-sm text-gray-600">{addr.country}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        <div
                                            className={`flex items-center space-x-4 border p-4 rounded-lg cursor-pointer transition-colors ${selectedAddressId === 'new' ? 'border-primary bg-primary/5' : 'hover:bg-accent/5'}`}
                                            onClick={() => setSelectedAddressId('new')}
                                        >
                                            <div className={`h-4 w-4 rounded-full border border-primary flex items-center justify-center ${selectedAddressId === 'new' ? 'bg-primary' : ''}`}>
                                                {selectedAddressId === 'new' && <div className="h-2 w-2 rounded-full bg-white" />}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Plus className="h-5 w-5 text-gray-600" />
                                                <span className="font-medium">Add New Address</span>
                                            </div>
                                        </div>

                                    </div>

                                    {/* New Address Form - Only show if 'new' is selected */}
                                    {selectedAddressId === 'new' && (
                                        <div className="space-y-4 border-t pt-4 animate-in fade-in slide-in-from-top-2">
                                            <div>
                                                <Label htmlFor="full_name">Full Name</Label>
                                                <Input
                                                    id="full_name"
                                                    required
                                                    value={formData.full_name}
                                                    onChange={handleInputChange}
                                                    placeholder="John Doe"
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="street">Street Address</Label>
                                                <Input
                                                    id="street"
                                                    required
                                                    value={formData.street}
                                                    onChange={handleInputChange}
                                                    placeholder="123 Main St"
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <Label htmlFor="city">City</Label>
                                                    <Input
                                                        id="city"
                                                        required
                                                        value={formData.city}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor="state">State</Label>
                                                    <Input
                                                        id="state"
                                                        required
                                                        value={formData.state}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <Label htmlFor="zip_code">ZIP / Postal Code</Label>
                                                    <Input
                                                        id="zip_code"
                                                        required
                                                        value={formData.zip_code}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor="country">Country</Label>
                                                    <Input
                                                        id="country"
                                                        required
                                                        value={formData.country}
                                                        onChange={handleInputChange}
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <div className="pt-6">
                                        <Label className="text-lg font-semibold mb-4 block">Payment Method</Label>
                                        <div className="grid gap-4">
                                            <div className="flex items-center space-x-4 border p-4 rounded-lg cursor-pointer hover:bg-accent/5 transition-colors"
                                                onClick={() => setFormData(prev => ({ ...prev, payment_method: 'online' }))}>
                                                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100">
                                                    <Banknote className="h-5 w-5 text-blue-800" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="font-medium">Pay Online (Razorpay)</p>
                                                    <p className="text-sm text-muted-foreground">Credit/Debit Card, UPI, NetBanking</p>
                                                </div>
                                                <input
                                                    type="radio"
                                                    name="payment_method"
                                                    checked={formData.payment_method === 'online'}
                                                    onChange={() => { }}
                                                    className="accent-green-800 h-4 w-4"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Order Summary */}
                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Order Summary</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="flex justify-between items-center text-sm">
                                            <span>{item.products.name} x {item.quantity}</span>
                                            <span>₹{(Number(item.products.price) * item.quantity).toFixed(2)}</span>
                                        </div>
                                    ))}

                                    <div className="border-t pt-4 space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Subtotal</span>
                                            <span>₹{subtotal.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Shipping</span>
                                            <span>₹49.00</span>
                                        </div>
                                        <div className="flex justify-between font-bold text-lg pt-2">
                                            <span>Total</span>
                                            <span className="text-green-600">₹{(subtotal + 49).toFixed(2)}</span>
                                        </div>
                                    </div>

                                    <Button
                                        type="submit"
                                        form="checkout-form"
                                        className="w-full mt-6 bg-green-800 hover:bg-green-900 text-white"
                                        disabled={processing}
                                    >
                                        {processing ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Processing Order...
                                            </>
                                        ) : (
                                            "Pay Now"
                                        )}
                                    </Button>
                                    <p className="text-xs text-center text-muted-foreground mt-2">
                                        This is a simulated payment. No real money will be charged.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main >
            <Footer />
        </div >
    );
};

export default Checkout;
