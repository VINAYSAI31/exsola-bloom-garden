import { Link, Outlet, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  ShoppingCart, 
  Settings,
  LogOut 
} from "lucide-react";
import { Button } from "@/components/ui/button";

const AdminLayout = () => {
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
    { icon: Package, label: "Products", path: "/admin/products" },
    { icon: Users, label: "Users", path: "/admin/users" },
    { icon: ShoppingCart, label: "Orders", path: "/admin/orders" },
    { icon: Settings, label: "Settings", path: "/admin/settings" },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-primary-foreground flex flex-col">
        <div className="p-6 border-b border-primary-foreground/20">
          <Link to="/">
            <h1 className="text-2xl font-bold">Exsola Admin</h1>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <Link key={item.path} to={item.path}>
              <Button
                variant="ghost"
                className={`w-full justify-start ${
                  isActive(item.path)
                    ? "bg-accent text-accent-foreground hover:bg-accent/90"
                    : "text-primary-foreground hover:bg-primary-foreground/10"
                }`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-primary-foreground/20">
          <Link to="/">
            <Button variant="ghost" className="w-full justify-start text-primary-foreground hover:bg-primary-foreground/10">
              <LogOut className="mr-3 h-5 w-5" />
              Back to Site
            </Button>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-background overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
