import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Eye, CheckCircle2, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";

interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  label?: string;
  is_default: boolean;
}

interface Order {
  id: string;
  user_id: string;
  total: number;
  status: string;
  created_at: string;
  dispatched?: boolean;
  phone?: string;
  profiles: {
    full_name: string;
    email: string;
    phone: string;
  };
  address?: Address;
}

interface OrderItem {
  id: string;
  product_id: string;
  quantity: number;
  price: number;
  products: {
    name: string;
    image_url: string;
  };
}

const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("orders")
      .select(`
        *,
        profiles:user_id (
          full_name,
          email,
          phone
        )
      `)
      .order("created_at", { ascending: false });

    if (!error && data) {
      // Fetch addresses for each order's user
      const ordersWithAddresses = await Promise.all(
        data.map(async (order: any) => {
          // Get user's default address or most recent address
          const { data: addresses } = await supabase
            .from("addresses")
            .select("*")
            .eq("user_id", order.user_id)
            .order("is_default", { ascending: false })
            .order("created_at", { ascending: false })
            .limit(1)
            .maybeSingle();

          return {
            ...order,
            dispatched: order.dispatched ?? false,
            address: addresses || undefined
          };
        })
      );

      setOrders(ordersWithAddresses);
    }
    setLoading(false);
  };

  const handleViewOrder = async (order: Order) => {
    setSelectedOrder(order);
    
    // Fetch order items
    const { data, error } = await supabase
      .from("order_items")
      .select(`
        *,
        products (
          name,
          image_url
        )
      `)
      .eq("order_id", order.id);

    if (!error && data) {
      setOrderItems(data as any);
    }

    // Fetch address if not already loaded
    if (!order.address) {
      const { data: addressData } = await supabase
        .from("addresses")
        .select("*")
        .eq("user_id", order.user_id)
        .order("is_default", { ascending: false })
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (addressData) {
        setSelectedOrder({ ...order, address: addressData });
      }
    }

    setIsDialogOpen(true);
  };

  const handleToggleDispatched = async (order: Order) => {
    const newDispatchedStatus = !order.dispatched;
    
    // Update local state immediately for better UX
    setOrders(orders.map(o => 
      o.id === order.id ? { ...o, dispatched: newDispatchedStatus } : o
    ));

    // Update in database
    const { error } = await supabase
      .from("orders")
      .update({ dispatched: newDispatchedStatus } as any)
      .eq("id", order.id);

    if (error) {
      console.error("Error updating dispatched status:", error);
      // Revert local state on error
      setOrders(orders.map(o => 
        o.id === order.id ? { ...o, dispatched: order.dispatched } : o
      ));
    }
  };

  const filteredOrders = orders.filter((o) =>
    o.profiles?.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Orders</h1>
        <p className="text-muted-foreground">Manage customer orders</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Orders</CardTitle>
          <CardDescription>View and manage all customer orders</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Input
              placeholder="Search by customer email..."
              className="max-w-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Delivery Address</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-center">Dispatched</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : filteredOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center">
                    No orders found
                  </TableCell>
                </TableRow>
              ) : (
                filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-mono text-sm">
                      {order.id.substring(0, 8)}...
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{order.profiles?.full_name || "N/A"}</p>
                        <p className="text-sm text-muted-foreground">
                          {order.profiles?.email || "N/A"}
                        </p>
                        {order.phone && (
                          <p className="text-sm font-medium text-green-600">
                            📞 {order.phone}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {order.address ? (
                        <div className="text-sm max-w-xs">
                          <div className="flex items-start gap-1 mb-1">
                            <MapPin className="h-3 w-3 mt-0.5 text-muted-foreground flex-shrink-0" />
                            <div>
                              <p className="font-medium">{order.address.street}</p>
                              <p className="text-muted-foreground">
                                {order.address.city}, {order.address.state} - {order.address.zip_code}
                              </p>
                              <p className="text-muted-foreground text-xs">{order.address.country}</p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">No address</span>
                      )}
                    </TableCell>
                    <TableCell className="font-semibold">
                      ₹{order.total.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <span className="inline-block px-2 py-1 rounded text-xs bg-blue-100 text-blue-800">
                        {order.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      {new Date(order.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleToggleDispatched(order)}
                        className="hover:bg-transparent"
                        title={order.dispatched ? "Mark as not dispatched" : "Mark as dispatched"}
                      >
                        <CheckCircle2 
                          className={`h-8 w-8 transition-colors ${
                            order.dispatched 
                              ? "text-green-600" 
                              : "text-yellow-500"
                          }`} 
                        />
                      </Button>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleViewOrder(order)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Order ID</p>
                  <p className="font-mono text-sm">{selectedOrder.id}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="text-sm">
                    {new Date(selectedOrder.created_at).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Customer</p>
                  <p className="text-sm">{selectedOrder.profiles?.full_name || "N/A"}</p>
                  <p className="text-xs text-muted-foreground">
                    {selectedOrder.profiles?.email || "N/A"}
                  </p>
                  {selectedOrder.phone && (
                    <p className="text-sm font-medium text-green-600">
                      📞 {selectedOrder.phone}
                    </p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="text-sm">{selectedOrder.status}</p>
                </div>
              </div>

              {selectedOrder.address && (
                <div className="border-t pt-4">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold mb-2">Delivery Address</p>
                      <div className="text-sm space-y-1">
                        <p className="font-medium">{selectedOrder.address.street}</p>
                        <p className="text-muted-foreground">
                          {selectedOrder.address.city}, {selectedOrder.address.state} - {selectedOrder.address.zip_code}
                        </p>
                        <p className="text-muted-foreground">{selectedOrder.address.country}</p>
                        {selectedOrder.address.label && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Label: {selectedOrder.address.label}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <h3 className="font-semibold mb-2">Order Items</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orderItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <img
                              src={item.products.image_url}
                              alt={item.products.name}
                              className="w-10 h-10 object-cover rounded"
                            />
                            <span>{item.products.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>₹{item.price.toFixed(2)}</TableCell>
                        <TableCell>
                          ₹{(item.quantity * item.price).toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>₹{selectedOrder.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminOrders;
