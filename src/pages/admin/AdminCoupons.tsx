import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Edit, Trash2, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import Swal from "sweetalert2";
import { useToast } from "@/hooks/use-toast";

interface Coupon {
  id: string;
  code: string;
  discount_type: "percentage" | "fixed";
  discount_value: number;
  min_order_amount: number;
  max_discount_amount: number | null;
  usage_limit: number | null;
  used_count: number;
  is_active: boolean;
  valid_from: string;
  valid_until: string | null;
  created_at: string;
}

const AdminCoupons = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    code: "",
    discount_type: "percentage" as "percentage" | "fixed",
    discount_value: "",
    min_order_amount: "",
    max_discount_amount: "",
    usage_limit: "",
    is_active: true,
    valid_from: "",
    valid_until: "",
  });

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("coupons" as any)
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setCoupons(data as unknown as Coupon[]);
    }
    setLoading(false);
  };

  const handleOpenDialog = (coupon?: Coupon) => {
    if (coupon) {
      setEditingCoupon(coupon);
      setFormData({
        code: coupon.code,
        discount_type: coupon.discount_type,
        discount_value: coupon.discount_value.toString(),
        min_order_amount: coupon.min_order_amount.toString(),
        max_discount_amount: coupon.max_discount_amount?.toString() || "",
        usage_limit: coupon.usage_limit?.toString() || "",
        is_active: coupon.is_active,
        valid_from: coupon.valid_from ? new Date(coupon.valid_from).toISOString().slice(0, 16) : "",
        valid_until: coupon.valid_until ? new Date(coupon.valid_until).toISOString().slice(0, 16) : "",
      });
    } else {
      setEditingCoupon(null);
      setFormData({
        code: "",
        discount_type: "percentage",
        discount_value: "",
        min_order_amount: "",
        max_discount_amount: "",
        usage_limit: "",
        is_active: true,
        valid_from: new Date().toISOString().slice(0, 16),
        valid_until: "",
      });
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const couponData = {
      code: formData.code.toUpperCase().trim(),
      discount_type: formData.discount_type,
      discount_value: parseFloat(formData.discount_value),
      min_order_amount: parseFloat(formData.min_order_amount) || 0,
      max_discount_amount: formData.max_discount_amount ? parseFloat(formData.max_discount_amount) : null,
      usage_limit: formData.usage_limit ? parseInt(formData.usage_limit) : null,
      is_active: formData.is_active,
      valid_from: formData.valid_from ? new Date(formData.valid_from).toISOString() : new Date().toISOString(),
      valid_until: formData.valid_until ? new Date(formData.valid_until).toISOString() : null,
    };

    try {
      if (editingCoupon) {
        const { error } = await supabase
          .from("coupons" as any)
          .update(couponData as any)
          .eq("id", editingCoupon.id);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Coupon updated successfully",
        });
      } else {
        const { error } = await supabase.from("coupons" as any).insert(couponData as any);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Coupon created successfully",
        });
      }

      setIsDialogOpen(false);
      fetchCoupons();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save coupon",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (coupon: Coupon) => {
    const result = await Swal.fire({
      title: "Delete Coupon",
      text: `Are you sure you want to delete coupon "${coupon.code}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      const { error } = await supabase.from("coupons" as any).delete().eq("id", coupon.id);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to delete coupon",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Coupon deleted successfully",
        });
        fetchCoupons();
      }
    }
  };

  const toggleActive = async (coupon: Coupon) => {
    const { error } = await supabase
      .from("coupons" as any)
      .update({ is_active: !coupon.is_active } as any)
      .eq("id", coupon.id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update coupon",
        variant: "destructive",
      });
    } else {
      fetchCoupons();
    }
  };

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold mb-2">Coupons</h1>
          <p className="text-muted-foreground">Manage discount coupon codes</p>
        </div>
        <Button onClick={() => handleOpenDialog()}>
          <Plus className="h-4 w-4 mr-2" />
          Add Coupon
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Coupons</CardTitle>
          <CardDescription>View and manage all coupon codes</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Min Order</TableHead>
                <TableHead>Usage</TableHead>
                <TableHead>Valid Until</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : coupons.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center">
                    No coupons found
                  </TableCell>
                </TableRow>
              ) : (
                coupons.map((coupon) => (
                  <TableRow key={coupon.id}>
                    <TableCell className="font-mono font-semibold">{coupon.code}</TableCell>
                    <TableCell>
                      {coupon.discount_type === "percentage" ? (
                        <span>{coupon.discount_value}%</span>
                      ) : (
                        <span>₹{coupon.discount_value.toFixed(2)}</span>
                      )}
                      {coupon.max_discount_amount && coupon.discount_type === "percentage" && (
                        <span className="text-xs text-muted-foreground block">
                          (Max ₹{coupon.max_discount_amount.toFixed(2)})
                        </span>
                      )}
                    </TableCell>
                    <TableCell>₹{coupon.min_order_amount.toFixed(2)}</TableCell>
                    <TableCell>
                      {coupon.used_count}
                      {coupon.usage_limit && ` / ${coupon.usage_limit}`}
                    </TableCell>
                    <TableCell>
                      {coupon.valid_until
                        ? new Date(coupon.valid_until).toLocaleDateString()
                        : "No expiry"}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant={coupon.is_active ? "default" : "secondary"}
                        size="sm"
                        onClick={() => toggleActive(coupon)}
                      >
                        {coupon.is_active ? "Active" : "Inactive"}
                      </Button>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleOpenDialog(coupon)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(coupon)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingCoupon ? "Edit Coupon" : "Add New Coupon"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="code">Coupon Code *</Label>
                <Input
                  id="code"
                  required
                  value={formData.code}
                  onChange={(e) =>
                    setFormData({ ...formData, code: e.target.value.toUpperCase() })
                  }
                  placeholder="SAVE20"
                />
              </div>
              <div>
                <Label htmlFor="discount_type">Discount Type *</Label>
                <Select
                  value={formData.discount_type}
                  onValueChange={(value: "percentage" | "fixed") =>
                    setFormData({ ...formData, discount_type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Percentage</SelectItem>
                    <SelectItem value="fixed">Fixed Amount</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="discount_value">
                  Discount Value * ({formData.discount_type === "percentage" ? "%" : "₹"})
                </Label>
                <Input
                  id="discount_value"
                  type="number"
                  step="0.01"
                  required
                  value={formData.discount_value}
                  onChange={(e) => setFormData({ ...formData, discount_value: e.target.value })}
                  placeholder={formData.discount_type === "percentage" ? "20" : "100"}
                />
              </div>
              {formData.discount_type === "percentage" && (
                <div>
                  <Label htmlFor="max_discount_amount">Max Discount (₹)</Label>
                  <Input
                    id="max_discount_amount"
                    type="number"
                    step="0.01"
                    value={formData.max_discount_amount}
                    onChange={(e) =>
                      setFormData({ ...formData, max_discount_amount: e.target.value })
                    }
                    placeholder="500"
                  />
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="min_order_amount">Minimum Order Amount (₹)</Label>
                <Input
                  id="min_order_amount"
                  type="number"
                  step="0.01"
                  value={formData.min_order_amount}
                  onChange={(e) => setFormData({ ...formData, min_order_amount: e.target.value })}
                  placeholder="0"
                />
              </div>
              <div>
                <Label htmlFor="usage_limit">Usage Limit</Label>
                <Input
                  id="usage_limit"
                  type="number"
                  value={formData.usage_limit}
                  onChange={(e) => setFormData({ ...formData, usage_limit: e.target.value })}
                  placeholder="Unlimited"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="valid_from">Valid From</Label>
                <Input
                  id="valid_from"
                  type="datetime-local"
                  value={formData.valid_from}
                  onChange={(e) => setFormData({ ...formData, valid_from: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="valid_until">Valid Until</Label>
                <Input
                  id="valid_until"
                  type="datetime-local"
                  value={formData.valid_until}
                  onChange={(e) => setFormData({ ...formData, valid_until: e.target.value })}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="is_active"
                checked={formData.is_active}
                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                className="rounded"
              />
              <Label htmlFor="is_active">Active</Label>
            </div>

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">{editingCoupon ? "Update" : "Create"}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminCoupons;

