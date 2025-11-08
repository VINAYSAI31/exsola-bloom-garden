import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import HowWeMakePage from "./pages/HowWeMakePage";
import Blogs from "./pages/Blogs";
import Learn from "./pages/Learn";
import BlogDetail from "./pages/BlogDetail";
import WorkshopDetail from "./pages/WorkshopDetail";
import TermsConditions from "./pages/TermsConditions";
import ReturnRefund from "./pages/ReturnRefund";
import FAQ from "./pages/FAQ";
import StoreLocation from "./pages/StoreLocation";
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminBlogs from "./pages/admin/AdminBlogs";
import AdminWorkshops from "./pages/admin/AdminWorkshops";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminSettings from "./pages/admin/AdminSettings";
import NotFound from "./pages/NotFound";
import { Analytics } from "@vercel/analytics/react";

const queryClient = new QueryClient();

// Scroll to top component
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/how-we-make" element={<HowWeMakePage />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:id" element={<BlogDetail />} />
          <Route path="/workshops/:id" element={<WorkshopDetail />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="/return-refund" element={<ReturnRefund />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/store-location" element={<StoreLocation />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/auth" element={<Auth />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<AdminProducts />} />
          <Route path="blogs" element={<AdminBlogs />} />
          <Route path="workshops" element={<AdminWorkshops />} />
          <Route path="users" element={<AdminUsers />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
        <Analytics />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
