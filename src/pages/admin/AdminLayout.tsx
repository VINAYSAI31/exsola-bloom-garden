import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  ShoppingCart, 
  Settings,
  LogOut,
  Home,
  Menu,
  X,
  BookOpen,
  Briefcase
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import Swal from "sweetalert2";
import { useState } from "react";

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Logout",
      text: "Are you sure you want to logout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, logout",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      await supabase.auth.signOut();
      navigate("/");
    }
  };

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
    { icon: Package, label: "Products", path: "/admin/products" },
    { icon: BookOpen, label: "Blogs", path: "/admin/blogs" },
    { icon: Briefcase, label: "Workshops", path: "/admin/workshops" },
    { icon: Users, label: "Users", path: "/admin/users" },
    { icon: ShoppingCart, label: "Orders", path: "/admin/orders" },
    { icon: Settings, label: "Settings", path: "/admin/settings" },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="flex min-h-screen">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-primary text-primary-foreground p-4 flex items-center justify-between z-50">
        <Link to="/">
          <h1 className="text-xl font-bold">Exsola Admin</h1>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-primary-foreground hover:bg-primary-foreground/10"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar - Fixed on desktop, slide-in on mobile */}
      <aside className={`
        w-64 bg-primary text-primary-foreground flex flex-col fixed h-screen z-50 transition-transform duration-300
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        <div className="p-6 border-b border-primary-foreground/20">
          <Link to="/" onClick={closeMobileMenu}>
            <h1 className="text-2xl font-bold">Exsola Admin</h1>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <Link key={item.path} to={item.path} onClick={closeMobileMenu}>
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

        <div className="p-4 border-t border-primary-foreground/20 space-y-2">
          <Link to="/" onClick={closeMobileMenu}>
            <Button variant="ghost" className="w-full justify-start text-primary-foreground hover:bg-primary-foreground/10">
              <Home className="mr-3 h-5 w-5" />
              Back to Site
            </Button>
          </Link>
          <Button
            variant="ghost"
            className="w-full justify-start text-primary-foreground hover:bg-primary-foreground/10"
            onClick={handleLogout}
          >
            <LogOut className="mr-3 h-5 w-5" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content - with left margin on desktop, full width on mobile */}
      <main className="flex-1 bg-background lg:ml-64 w-full overflow-auto pt-16 lg:pt-0">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;