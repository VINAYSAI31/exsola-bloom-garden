import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Swal from "sweetalert2";
import { supabase } from "@/integrations/supabase/client";

const AdminSettings = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [currentUserEmail, setCurrentUserEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.email) {
        setCurrentUserEmail(user.email);
      }
    };
    getUser();
  }, []);

  const handleSave = () => {
    Swal.fire({
      title: "Success!",
      text: "Settings saved successfully",
      icon: "success",
    });
  };

  const handleChangePassword = async () => {
    if (!newPassword || !confirmNewPassword) {
      Swal.fire({
        title: "Error",
        text: "Please fill in both password fields",
        icon: "error",
      });
      return;
    }

    if (newPassword !== confirmNewPassword) {
      Swal.fire({
        title: "Error",
        text: "Passwords do not match",
        icon: "error",
      });
      return;
    }

    setIsLoading(true);
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });

    setIsLoading(false);

    if (error) {
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
      });
    } else {
      Swal.fire({
        title: "Success",
        text: "Password updated successfully",
        icon: "success",
      });
      setNewPassword("");
      setConfirmNewPassword("");
    }
  };

  const handleResetPasswordEmail = async () => {
    if (!currentUserEmail) {
      Swal.fire({
        title: "Error",
        text: "Could not identify current user email",
        icon: "error",
      });
      return;
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(currentUserEmail, {
        redirectTo: `${window.location.origin}/admin/settings`
      });

      if (error) throw error;

      Swal.fire({
        title: "Email Sent",
        text: "Check your email for the password reset link",
        icon: "success",
      });

    } catch (error: any) {
      Swal.fire({
        title: "Error",
        text: error.message || "Failed to send reset email",
        icon: "error",
      });
    }
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
            <CardTitle>Security Settings</CardTitle>
            <CardDescription>Manage your account security</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Change Password</h3>
              <div className="grid gap-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  placeholder="Confirm new password"
                />
              </div>
              <Button
                onClick={handleChangePassword}
                disabled={isLoading}
                className="bg-accent hover:bg-accent/90"
              >
                {isLoading ? "Updating..." : "Update Password"}
              </Button>
            </div>

            <div className="pt-4 border-t">
              <h3 className="text-lg font-medium mb-2">Reset Password</h3>
              <p className="text-sm text-muted-foreground mb-4">
                If you need to reset your password via email, click the button below.
                An email will be sent to <strong>{currentUserEmail}</strong>.
              </p>
              <Button
                onClick={handleResetPasswordEmail}
                variant="outline"
                className="border-destructive text-destructive hover:bg-destructive/10"
              >
                Send Password Reset Email
              </Button>
            </div>
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
