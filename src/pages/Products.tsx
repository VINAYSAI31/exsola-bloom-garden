import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import useLaunchCountdown from "@/hooks/useLaunchCountdown";
import LaunchCountdown from "@/components/LaunchCountdown";
import LaunchCelebration from "@/components/LaunchCelebration";

const Products = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const { timeLeft, isLaunched } = useLaunchCountdown();
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out",
    });
    fetchProducts();
  }, []);

  useEffect(() => {
    if (!isLaunched) return;
    setShowCelebration(true);
    const timeout = setTimeout(() => setShowCelebration(false), 9000);
    return () => clearTimeout(timeout);
  }, [isLaunched]);

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
      <LaunchCelebration show={showCelebration} />
      <Navbar />
      <main className="flex-1">
        {/* Header */}
        <section className="py-16 section-gradient">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black" data-aos="fade-up">
              Our Products
            </h1>
            <p
              className=" text-lg mb-8 text-gray-600"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              Explore our premium selection of organic mushrooms
            </p>

            <div className="mt-6 max-w-3xl mx-auto">
              <LaunchCountdown
                timeLeft={timeLeft}
                isLaunched={isLaunched}
                label="Shop unlocks in"
                variant="card"
              />
            </div>

            {/* Category Sections */}
            <div
              className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto mt-8"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <Card
                className=" p-6 cursor-pointer hover:shadow-lg transition-all hover:scale-105 "
                onClick={() => {
                  setSelectedCategories(["Mushroom Growing Kits"]);
                  window.scrollTo({ top: 400, behavior: "smooth" });
                }}
              >
                <h3 className="font-semibold text-lg mb-2 text-black">Mushroom Growing Kits</h3>
                <p className="text-sm  text-gray-600">
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
                <h3 className="font-semibold text-lg mb-2 text-black">Dried Mushroom</h3>
                <p className="text-sm  text-gray-600">
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
                <h3 className="font-semibold text-lg mb-2 text-black">Mushroom Spawn</h3>
                <p className="text-sm  text-gray-600">
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
                <h3 className="font-semibold text-lg mb-2 text-black">Cultivation Supplies</h3>
                <p className="text-sm  text-gray-600">
                  Essential supplies for mushroom cultivation
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4">
            <div className="relative">
              {!isLaunched && (
                <div className="absolute inset-0 z-10 flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-lg border border-green-200 rounded-2xl shadow-xl p-6 max-w-xl text-center space-y-3">
                    <p className="text-lg font-semibold text-gray-900">
                      Shop unlocks at 10:00 AM · Stay tuned!
                    </p>
                    <LaunchCountdown
                      timeLeft={timeLeft}
                      isLaunched={isLaunched}
                      label="Come back in"
                      variant="overlay"
                    />
                  </div>
                </div>
              )}

              <div className={!isLaunched ? "opacity-40 pointer-events-none select-none" : ""}>
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
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
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
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Products;
