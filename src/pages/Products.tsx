import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";

// Mock product data
const allProducts = [
  {
    id: "1",
    name: "Organic Button Mushrooms",
    price: 8.99,
    image: "https://images.unsplash.com/photo-1568471173230-b71caaa0d18f?w=500&h=500&fit=crop",
    description: "Fresh, organic button mushrooms perfect for any dish",
  },
  {
    id: "2",
    name: "Shiitake Mushrooms",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1561507930-9ffffdfa8e9b?w=500&h=500&fit=crop",
    description: "Premium shiitake mushrooms with rich, savory flavor",
  },
  {
    id: "3",
    name: "Oyster Mushrooms",
    price: 10.99,
    image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=500&h=500&fit=crop",
    description: "Delicate oyster mushrooms with a mild, sweet taste",
  },
  {
    id: "4",
    name: "Portobello Mushrooms",
    price: 9.99,
    image: "https://images.unsplash.com/photo-1583697013014-a0b8b64d64b3?w=500&h=500&fit=crop",
    description: "Large, meaty portobello mushrooms ideal for grilling",
  },
  {
    id: "5",
    name: "Enoki Mushrooms",
    price: 7.99,
    image: "https://images.unsplash.com/photo-1598853721148-22c5f5041f4d?w=500&h=500&fit=crop",
    description: "Delicate enoki mushrooms with a crisp texture",
  },
  {
    id: "6",
    name: "King Oyster Mushrooms",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1585770038403-dd94bf5e7e8c?w=500&h=500&fit=crop",
    description: "Premium king oyster mushrooms with meaty texture",
  },
  {
    id: "7",
    name: "Lion's Mane Mushrooms",
    price: 16.99,
    image: "https://images.unsplash.com/photo-1635098818539-a84d1d9cdc3a?w=500&h=500&fit=crop",
    description: "Exotic lion's mane mushrooms with unique flavor",
  },
  {
    id: "8",
    name: "Maitake Mushrooms",
    price: 13.99,
    image: "https://images.unsplash.com/photo-1581953280962-8d82992e3160?w=500&h=500&fit=crop",
    description: "Flavorful maitake mushrooms, also known as hen of the woods",
  },
];

const Products = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out",
    });
  }, []);

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
            <p className="text-muted-foreground text-lg" data-aos="fade-up" data-aos-delay="100">
              Explore our premium selection of organic mushrooms
            </p>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {allProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Products;
