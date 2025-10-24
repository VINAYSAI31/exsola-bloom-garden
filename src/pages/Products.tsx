import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

const Products = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("newest");
  const [priceRange, setPriceRange] = useState<string>("all");

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out",
    });
    fetchProducts();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [products, selectedCategories, sortBy, priceRange]);

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("in_stock", true);

    if (!error && data) {
      setProducts(data);
      
      // Extract unique categories
      const uniqueCategories = [...new Set(data.map(p => p.category).filter(Boolean))] as string[];
      setCategories(uniqueCategories);
    }
    setLoading(false);
  };

  const applyFilters = () => {
    let filtered = [...products];

    // Filter by category
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(p => selectedCategories.includes(p.category));
    }

    // Filter by price range
    if (priceRange !== "all") {
      filtered = filtered.filter(p => {
        const price = p.price;
        if (priceRange === "0-500") return price <= 500;
        if (priceRange === "500-1000") return price > 500 && price <= 1000;
        if (priceRange === "1000-2000") return price > 1000 && price <= 2000;
        if (priceRange === "2000+") return price > 2000;
        return true;
      });
    }

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      // newest (default)
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });

    setFilteredProducts(filtered);
  };

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Header */}
        <section className="py-16 section-gradient">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4" data-aos="fade-up">
              Our Products
            </h1>
            <p className="text-muted-foreground text-lg mb-8" data-aos="fade-up" data-aos-delay="100">
              Explore our premium selection of organic mushrooms
            </p>
            
            {/* Category Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto mt-8" data-aos="fade-up" data-aos-delay="200">
              <Card 
                className="p-6 cursor-pointer hover:shadow-lg transition-all hover:scale-105"
                onClick={() => {
                  setSelectedCategories(['Mushroom Growing Kits']);
                  window.scrollTo({ top: 400, behavior: 'smooth' });
                }}
              >
                <h3 className="font-semibold text-lg mb-2">Mushroom Growing Kits</h3>
                <p className="text-sm text-muted-foreground">Grow your own gourmet mushrooms at home</p>
              </Card>
              
              <Card 
                className="p-6 cursor-pointer hover:shadow-lg transition-all hover:scale-105"
                onClick={() => {
                  setSelectedCategories(['Dried Mushroom']);
                  window.scrollTo({ top: 400, behavior: 'smooth' });
                }}
              >
                <h3 className="font-semibold text-lg mb-2">Dried Mushroom</h3>
                <p className="text-sm text-muted-foreground">Premium sundried mushrooms for cooking</p>
              </Card>
              
              <Card 
                className="p-6 cursor-pointer hover:shadow-lg transition-all hover:scale-105"
                onClick={() => {
                  setSelectedCategories(['Mushroom Spawn']);
                  window.scrollTo({ top: 400, behavior: 'smooth' });
                }}
              >
                <h3 className="font-semibold text-lg mb-2">Mushroom Spawn</h3>
                <p className="text-sm text-muted-foreground">High-quality spawn for cultivation</p>
              </Card>
              
              <Card 
                className="p-6 cursor-pointer hover:shadow-lg transition-all hover:scale-105"
                onClick={() => {
                  setSelectedCategories(['Mushroom Cultivation Supplies']);
                  window.scrollTo({ top: 400, behavior: 'smooth' });
                }}
              >
                <h3 className="font-semibold text-lg mb-2">Cultivation Supplies</h3>
                <p className="text-sm text-muted-foreground">Essential supplies for mushroom cultivation</p>
              </Card>
            </div>
          </div>
        </section>

        {/* Filters and Products */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="flex justify-center items-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-accent" />
              </div>
            ) : (
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Filters Sidebar */}
                <aside className="lg:w-64 space-y-6">
                  <Card className="p-6">
                    <h3 className="font-semibold text-lg mb-4">Sort By</h3>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest">Newest First</SelectItem>
                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                        <SelectItem value="name">Name: A to Z</SelectItem>
                      </SelectContent>
                    </Select>
                  </Card>

                  <Card className="p-6">
                    <h3 className="font-semibold text-lg mb-4">Price Range</h3>
                    <Select value={priceRange} onValueChange={setPriceRange}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Prices</SelectItem>
                        <SelectItem value="0-500">Under ₹500</SelectItem>
                        <SelectItem value="500-1000">₹500 - ₹1000</SelectItem>
                        <SelectItem value="1000-2000">₹1000 - ₹2000</SelectItem>
                        <SelectItem value="2000+">Above ₹2000</SelectItem>
                      </SelectContent>
                    </Select>
                  </Card>

                  {categories.length > 0 && (
                    <Card className="p-6">
                      <h3 className="font-semibold text-lg mb-4">Category</h3>
                      <div className="space-y-3">
                        {categories.map((category) => (
                          <div key={category} className="flex items-center space-x-2">
                            <Checkbox
                              id={category}
                              checked={selectedCategories.includes(category)}
                              onCheckedChange={() => handleCategoryToggle(category)}
                            />
                            <Label htmlFor={category} className="cursor-pointer">
                              {category}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </Card>
                  )}
                </aside>

                {/* Products Grid */}
                <div className="flex-1">
                  {filteredProducts.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-lg text-muted-foreground">No products match your filters.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredProducts.map((product) => (
                        <ProductCard 
                          key={product.id} 
                          id={product.id}
                          name={product.name}
                          price={product.price}
                          image={product.image_url}
                          description={product.description}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Products;
