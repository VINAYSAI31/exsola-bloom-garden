import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, Trash2, ShoppingCart } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import Swal from "sweetalert2";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  created_at: string;
}

interface CartItem {
  id: string;
  quantity: number;
  products: {
    id: string;
    name: string;
    price: number;
    image_url: string;
  };
}

const AdminUsers = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCartDialogOpen, setIsCartDialogOpen] = useState(false);
  const [viewingUser, setViewingUser] = useState<UserProfile | null>(null);
  const [userCart, setUserCart] = useState<CartItem[]>([]);
  const [cartLoading, setCartLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setUsers(data);
    }
    setLoading(false);
  };

  const handleView = (user: UserProfile) => {
    setViewingUser(user);
    setIsDialogOpen(true);
  };

  const handleViewCart = async (user: UserProfile) => {
    setViewingUser(user);
    setCartLoading(true);
    setIsCartDialogOpen(true);

    const { data, error } = await supabase
      .from("cart_items")
      .select(`
        id,
        quantity,
        products (
          id,
          name,
          price,
          image_url
        )
      `)
      .eq("user_id", user.id);

    if (!error && data) {
      setUserCart(data as CartItem[]);
    } else {
      setUserCart([]);
    }
    setCartLoading(false);
  };

  const handleDelete = (user: UserProfile) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will delete the user's profile. You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { error } = await supabase
          .from("profiles")
          .delete()
          .eq("id", user.id);

        if (error) {
          Swal.fire("Error!", "Failed to delete user profile", "error");
        } else {
          Swal.fire("Deleted!", "User profile has been deleted.", "success");
          fetchUsers();
        }
      }
    });
  };

  const filteredUsers = users.filter(
    (u) =>
      u.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const cartTotal = userCart.reduce((sum, item) => sum + (item.products?.price * item.quantity), 0);

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold mb-2">Users</h1>
          <p className="text-muted-foreground">Manage customer accounts ({users.length} total users)</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>View and manage all registered users including their cart</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Input
              placeholder="Search users..."
              className="max-w-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    No users found
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">
                      {user.full_name || "N/A"}
                    </TableCell>
                    <TableCell>{user.email || "N/A"}</TableCell>
                    <TableCell>{user.phone || "N/A"}</TableCell>
                    <TableCell>
                      {new Date(user.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleView(user)}
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleViewCart(user)}
                        title="View Cart"
                      >
                        <ShoppingCart className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(user)}
                        title="Delete User"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* User Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
          </DialogHeader>
          {viewingUser && (
            <div className="space-y-4">
              <div>
                <Label>Full Name</Label>
                <p className="text-sm mt-1">{viewingUser.full_name || "N/A"}</p>
              </div>
              <div>
                <Label>Email</Label>
                <p className="text-sm mt-1">{viewingUser.email || "N/A"}</p>
              </div>
              <div>
                <Label>Phone</Label>
                <p className="text-sm mt-1">{viewingUser.phone || "N/A"}</p>
              </div>
              <div>
                <Label>Joined</Label>
                <p className="text-sm mt-1">
                  {new Date(viewingUser.created_at).toLocaleString()}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* User Cart Dialog */}
      <Dialog open={isCartDialogOpen} onOpenChange={setIsCartDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              Cart for {viewingUser?.full_name || viewingUser?.email || "User"}
            </DialogTitle>
          </DialogHeader>
          {cartLoading ? (
            <div className="text-center py-8">Loading cart...</div>
          ) : userCart.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              This user's cart is empty
            </div>
          ) : (
            <div className="space-y-4">
              {userCart.map((item) => (
                <div key={item.id} className="flex items-center gap-4 border rounded-lg p-3">
                  <img
                    src={item.products?.image_url}
                    alt={item.products?.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{item.products?.name}</p>
                    <p className="text-sm text-muted-foreground">
                      ₹{item.products?.price} x {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary">Qty: {item.quantity}</Badge>
                    <p className="font-semibold mt-1">
                      ₹{(item.products?.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
              <div className="border-t pt-4 flex justify-between items-center">
                <span className="font-semibold">Cart Total:</span>
                <span className="text-xl font-bold text-accent">₹{cartTotal.toFixed(2)}</span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminUsers;