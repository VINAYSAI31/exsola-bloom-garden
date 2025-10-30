import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";

const Products = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

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
  }, [products, selectedCategories]);

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("in_stock", true);

    if (!error && data) {
      setProducts(data);
    }
    setLoading(false);
  };

  const applyFilters = () => {
    if (selectedCategories.length === 0) {
      setFilteredProducts(products);
      return;
    }

    const filtered = products.filter((p) => selectedCategories.includes(p.category));
    setFilteredProducts(filtered);
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
            <p
              className="text-muted-foreground text-lg mb-8"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              Explore our premium selection of organic mushrooms
            </p>

            {/* Category Sections */}
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto mt-8"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <Card
                className="p-6 cursor-pointer hover:shadow-lg transition-all hover:scale-105"
                onClick={() => {
                  setSelectedCategories(["Mushroom Growing Kits"]);
                  window.scrollTo({ top: 400, behavior: "smooth" });
                }}
              >
                <h3 className="font-semibold text-lg mb-2">Mushroom Growing Kits</h3>
                <p className="text-sm text-muted-foreground">
                  Grow your own gourmet mushrooms at home
                </p>
              </Card>

              <Card
                className="p-6 cursor-pointer hover:shadow-lg transition-all hover:scale-105"
                onClick={() => {
                  setSelectedCategories(["Dried Mushroom"]);
                  window.scrollTo({ top: 400, behavior: "smooth" });
                }}
              >
                <h3 className="font-semibold text-lg mb-2">Dried Mushroom</h3>
                <p className="text-sm text-muted-foreground">
                  Premium sundried mushrooms for cooking
                </p>
              </Card>

              <Card
                className="p-6 cursor-pointer hover:shadow-lg transition-all hover:scale-105"
                onClick={() => {
                  setSelectedCategories(["Mushroom Spawn"]);
                  window.scrollTo({ top: 400, behavior: "smooth" });
                }}
              >
                <h3 className="font-semibold text-lg mb-2">Mushroom Spawn</h3>
                <p className="text-sm text-muted-foreground">
                  High-quality spawn for cultivation
                </p>
              </Card>

              <Card
                className="p-6 cursor-pointer hover:shadow-lg transition-all hover:scale-105"
                onClick={() => {
                  setSelectedCategories(["Mushroom Cultivation Supplies"]);
                  window.scrollTo({ top: 400, behavior: "smooth" });
                }}
              >
                <h3 className="font-semibold text-lg mb-2">Cultivation Supplies</h3>
                <p className="text-sm text-muted-foreground">
                  Essential supplies for mushroom cultivation
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="flex justify-center items-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-accent" />
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
                <div className="max-w-md mx-auto bg-gradient-to-br from-green-50 to-green-100 rounded-3xl p-12 border border-green-200">
                  <div className="w-20 h-20 bg-green-800 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Clock className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Coming Soon</h2>
                  <p className="text-gray-600 mb-6">
                    {selectedCategories.length > 0 
                      ? `We're preparing amazing ${selectedCategories[0].toLowerCase()} products for you. Stay tuned for updates!`
                      : "We're preparing amazing products for you. Stay tuned for updates!"
                    }
                  </p>
                  <div className="flex items-center justify-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-2" />
                    Products coming soon
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    image={product.image_url}
                    description={product.description}
                    amazon_link={product.amazon_link}
                  />
                ))}
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
