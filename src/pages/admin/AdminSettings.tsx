import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Swal from "sweetalert2";

const AdminSettings = () => {
  const handleSave = () => {
    Swal.fire({
      title: "Success!",
      text: "Settings saved successfully",
      icon: "success",
    });
  };

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your store settings</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Store Information</CardTitle>
            <CardDescription>Update your store details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="store-name">Store Name</Label>
              <Input id="store-name" defaultValue="Exsola" />
            </div>
            <div>
              <Label htmlFor="store-email">Contact Email</Label>
              <Input id="store-email" type="email" defaultValue="info@exsola.com" />
            </div>
            <div>
              <Label htmlFor="store-phone">Phone Number</Label>
              <Input id="store-phone" defaultValue="+1 234 567 8900" />
            </div>
            <div>
              <Label htmlFor="store-address">Address</Label>
              <Textarea
                id="store-address"
                rows={3}
                defaultValue="123 Mushroom Lane, Organic City, OC 12345"
              />
            </div>
            <Button onClick={handleSave} className="bg-accent hover:bg-accent/90">
              Save Changes
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Shipping Settings</CardTitle>
            <CardDescription>Configure shipping options</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="shipping-fee">Standard Shipping Fee</Label>
              <Input id="shipping-fee" type="number" step="0.01" defaultValue="5.99" />
            </div>
            <div>
              <Label htmlFor="free-shipping">Free Shipping Threshold</Label>
              <Input
                id="free-shipping"
                type="number"
                step="0.01"
                defaultValue="50.00"
              />
            </div>
            <Button onClick={handleSave} className="bg-accent hover:bg-accent/90">
              Save Changes
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tax Settings</CardTitle>
            <CardDescription>Configure tax rates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="tax-rate">Tax Rate (%)</Label>
              <Input id="tax-rate" type="number" step="0.01" defaultValue="8.5" />
            </div>
            <Button onClick={handleSave} className="bg-accent hover:bg-accent/90">
              Save Changes
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminSettings;
