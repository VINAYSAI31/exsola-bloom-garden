import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, MapPin, Package, Settings, Loader2, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";

interface Profile {
  full_name: string | null;
  email: string | null;
  phone: string | null;
}

interface Address {
  id: string;
  label: string;
  street: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  is_default: boolean;
}

interface Order {
  id: string;
  created_at: string;
  status: string;
  total: number;
  order_items: { quantity: number }[];
}

const Profile = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const { toast } = useToast();
  const [isAddAddressOpen, setIsAddAddressOpen] = useState(false);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setUser(session?.user || null);
    if (session?.user) {
      fetchProfile(session.user.id);
      fetchOrders(session.user.id);
      fetchAddresses(session.user.id);
    } else {
      setLoading(false);
    }
  };

  const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .maybeSingle();

    if (!error && data) {
      setProfile(data);
    }
    setLoading(false);
  };

  const fetchOrders = async (userId: string) => {
    const { data, error } = await supabase
      .from("orders")
      .select(`
        id,
        created_at,
        status,
        total,
        order_items (quantity)
      `)
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    setOrders(data || []);
  }


  const fetchAddresses = async (userId: string) => {
    const { data, error } = await supabase
      .from("addresses")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setAddresses(data);
    }
  };

  const handleAddAddress = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (!user?.id) return;

    const newAddress = {
      user_id: user.id,
      label: formData.get("label") as string || "Home",
      street: formData.get("street") as string,
      city: formData.get("city") as string,
      state: formData.get("state") as string,
      zip_code: formData.get("zip_code") as string,
      country: formData.get("country") as string || "India",
      is_default: addresses.length === 0, // Make default if it's the first one
    };

    const { error } = await supabase
      .from("addresses")
      .insert(newAddress);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to add address",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Address added successfully",
      });
      setIsAddAddressOpen(false);
      fetchAddresses(user.id);
    }
  }


  const handleDeleteAddress = async (addressId: string) => {
    const { error } = await supabase
      .from("addresses")
      .delete()
      .eq("id", addressId);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete address",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Address deleted successfully",
      });
      fetchAddresses(user.id);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (!user?.id) return;

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: formData.get("fullName") as string,
        phone: formData.get("phone") as string,
      })
      .eq("id", user.id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
      fetchProfile(user.id);
    }
  };

  // Generate display order number (0001, 0002, etc.)
  const getOrderDisplayNumber = (index: number, totalOrders: number) => {
    const orderNumber = totalOrders - index;
    return String(orderNumber).padStart(4, '0');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-8">My Account</h1>

          {!user ? (
            <Card className="p-12 text-center">
              <User className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-2xl font-semibold mb-2">Profile Access Required</h2>
              <p className="text-muted-foreground mb-6">
                Sign in to your account or create a new account to view and manage your profile
              </p>
              <div className="flex gap-4 justify-center">
                <Button asChild className="bg-accent hover:bg-accent/90">
                  <Link to="/auth">Sign In</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/products">Browse Products</Link>
                </Button>
              </div>
            </Card>
          ) : loading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <Loader2 className="h-8 w-8 animate-spin text-accent" />
            </div>
          ) : (
            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="profile">
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </TabsTrigger>
                <TabsTrigger value="addresses">
                  <MapPin className="h-4 w-4 mr-2" />
                  Addresses
                </TabsTrigger>
                <TabsTrigger value="orders">
                  <Package className="h-4 w-4 mr-2" />
                  Orders
                </TabsTrigger>
                <TabsTrigger value="settings">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your personal details</CardDescription>
                  </CardHeader>
                  <form onSubmit={handleUpdateProfile}>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          name="fullName"
                          defaultValue={profile?.full_name || ""}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          defaultValue={profile?.email || ""}
                          disabled
                        />
                        <p className="text-sm text-muted-foreground">Email cannot be changed</p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          defaultValue={profile?.phone || ""}
                        />
                      </div>
                      <Button type="submit" className="bg-accent hover:bg-accent/90">Save Changes</Button>
                    </CardContent>
                  </form>
                </Card>
              </TabsContent>

              <TabsContent value="addresses">
                <Card>
                  <CardHeader>
                    <CardTitle>Delivery Addresses</CardTitle>
                    <CardDescription>Manage your delivery addresses</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {addresses.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        No addresses saved yet.
                      </div>
                    ) : (
                      addresses.map((addr) => (
                        <div key={addr.id} className="border rounded-lg p-4 relative">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="font-semibold">{addr.label} {addr.is_default && <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded ml-2">Default</span>}</p>
                              <p className="text-sm text-muted-foreground">{addr.street}</p>
                              <p className="text-sm text-muted-foreground">{addr.city}, {addr.state} {addr.zip_code}</p>
                              <p className="text-sm text-muted-foreground">{addr.country}</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive hover:bg-destructive/10"
                              onClick={() => handleDeleteAddress(addr.id)}
                              title="Delete Address"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))
                    )}

                    <Sheet open={isAddAddressOpen} onOpenChange={setIsAddAddressOpen}>
                      <SheetTrigger asChild>
                        <Button variant="outline" className="w-full">Add New Address</Button>
                      </SheetTrigger>
                      <SheetContent>
                        <SheetHeader>
                          <SheetTitle>Add New Address</SheetTitle>
                          <SheetDescription>
                            Add a new delivery address to your account.
                          </SheetDescription>
                        </SheetHeader>
                        <form onSubmit={handleAddAddress} className="space-y-4 mt-4">
                          <div className="space-y-2">
                            <Label htmlFor="label">Label (e.g. Home, Work)</Label>
                            <Input id="label" name="label" placeholder="Home" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="street">Street Address</Label>
                            <Textarea id="street" name="street" placeholder="123 Main St" required />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="space-y-2">
                              <Label htmlFor="city">City</Label>
                              <Input id="city" name="city" required />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="state">State</Label>
                              <Input id="state" name="state" required />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="space-y-2">
                              <Label htmlFor="zip_code">ZIP Code</Label>
                              <Input id="zip_code" name="zip_code" required />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="country">Country</Label>
                              <Input id="country" name="country" defaultValue="India" />
                            </div>
                          </div>
                          <SheetFooter>
                            <Button type="submit" className="w-full bg-accent hover:bg-accent/90">Save Address</Button>
                          </SheetFooter>
                        </form>
                      </SheetContent>
                    </Sheet>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="orders">
                <Card>
                  <CardHeader>
                    <CardTitle>Order History</CardTitle>
                    <CardDescription>View your past orders</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {orders.filter(o => o.order_items.length > 0).length === 0 ? (
                      <p className="text-center text-muted-foreground py-8">No orders yet</p>
                    ) : (
                      orders.filter(o => o.order_items.length > 0).map((order, index) => {
                        const itemCount = order.order_items.reduce((sum, item) => sum + item.quantity, 0);
                        const displayStatus = order.status === 'pending_payment' ? 'Payment Pending' :
                          order.status === 'pending' ? 'Processing' :
                            order.status.charAt(0).toUpperCase() + order.status.slice(1);
                        
                        const filteredOrders = orders.filter(o => o.order_items.length > 0);
                        const displayNumber = getOrderDisplayNumber(index, filteredOrders.length);

                        return (
                          <div key={order.id} className="border rounded-lg p-4">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <p className="font-semibold">Order #{displayNumber}</p>
                                <p className="text-sm text-muted-foreground">
                                  {new Date(order.created_at).toLocaleDateString()}
                                </p>
                                <p className="text-sm mt-1">
                                  <span className={`inline-block px-2 py-1 rounded text-xs ${order.status === "delivered" || order.status === "paid"
                                    ? "bg-green-100 text-green-800"
                                    : order.status === "pending"
                                      ? "bg-blue-100 text-blue-800"
                                      : "bg-yellow-100 text-yellow-800"
                                    }`}>
                                    {displayStatus}
                                  </span>
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-bold text-accent">₹{Number(order.total).toFixed(2)}</p>
                                <p className="text-sm text-muted-foreground">{itemCount} items</p>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>Manage your account preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input id="currentPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
                      <Input id="confirmNewPassword" type="password" />
                    </div>
                    <Button className="bg-accent hover:bg-accent/90">Update Password</Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;