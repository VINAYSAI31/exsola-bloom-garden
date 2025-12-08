import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, User, LogOut, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User as SupabaseUser } from "@supabase/supabase-js";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Navbar = () => {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [cartCount, setCartCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchCartCount(session.user.id);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchCartCount(session.user.id);
      } else {
        setCartCount(0);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const handleCartUpdate = () => {
      if (user) {
        fetchCartCount(user.id);
      }
    };

    window.addEventListener("cart-updated", handleCartUpdate);
    return () => window.removeEventListener("cart-updated", handleCartUpdate);
  }, [user]);

  const fetchCartCount = async (userId: string) => {
    const { data, error } = await supabase
      .from("cart_items")
      .select("quantity")
      .eq("user_id", userId);

    if (!error && data) {
      const total = data.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(total);
    }
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();

      // Aggressively clear local storage to prevent lingering sessions
      for (const key in localStorage) {
        if (key.startsWith('sb-') && key.endsWith('-auth-token')) {
          localStorage.removeItem(key);
        }
      }
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      setUser(null);
      setCartCount(0);
      navigate("/");
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-card shadow-warm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="/logo.jpg"
              alt="Exsola"
              className="h-32 w-auto"
            />
          </Link>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-foreground hover:text-accent transition-colors">
              Home
            </Link>
            <Link to="/products" className="text-foreground hover:text-accent transition-colors">
              Shop
            </Link>
            <Link to="/blogs" className="text-foreground hover:text-accent transition-colors">
              Blogs
            </Link>
            <Link to="/events" className="text-foreground hover:text-accent transition-colors">
              Events
            </Link>
            <Link to="/about" className="text-foreground hover:text-accent transition-colors">
              About Us
            </Link>
            <Link to="/contact" className="text-foreground hover:text-accent transition-colors">
              Contact
            </Link>
            <Link to="/learn" className="text-foreground hover:text-accent transition-colors">
              Learn
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {/* Mobile Menu - positioned at the end */}
            <div className="md:hidden ml-auto">
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px]">
                  <nav className="flex flex-col space-y-4 mt-8">
                    <Link
                      to="/"
                      className="text-foreground hover:text-accent transition-colors text-lg"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Home
                    </Link>
                    <Link
                      to="/products"
                      className="text-foreground hover:text-accent transition-colors text-lg"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Shop
                    </Link>
                    <Link
                      to="/blogs"
                      className="text-foreground hover:text-accent transition-colors text-lg"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Blogs
                    </Link>
                    <Link
                      to="/events"
                      className="text-foreground hover:text-accent transition-colors text-lg"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Events
                    </Link>
                    <Link
                      to="/about"
                      className="text-foreground hover:text-accent transition-colors text-lg"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      About Us
                    </Link>
                    <Link
                      to="/contact"
                      className="text-foreground hover:text-accent transition-colors text-lg"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Contact
                    </Link>
                    <Link
                      to="/learn"
                      className="text-foreground hover:text-accent transition-colors text-lg"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Learn
                    </Link>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>

            {user ? (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigate("/profile")}
                  title="Profile"
                >
                  <User className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleSignOut}
                  title="Sign Out"
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </>
            ) : (
              <Link to="/auth">
                <Button variant="default" className="bg-accent hover:bg-accent/90">
                  <User className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
