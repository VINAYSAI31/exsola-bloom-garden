import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, Users, Calendar, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Blog {
  id: string;
  title: string;
  content: string;
  image_url: string | null;
  read_time: string;
  category: string;
  created_at: string;
}

const Blogs = () => {
  const [activeCategory, setActiveCategory] = useState<string>("research");
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, [activeCategory]);

  const fetchBlogs = async () => {
    try {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("category", activeCategory)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setBlogs(data || []);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Knowledge Hub
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our comprehensive collection of mushroom insights, research findings, and educational workshops
            </p>
          </div>

          {/* Category Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <button
              onClick={() => setActiveCategory("research")}
              className={`bg-white border rounded-xl p-6 text-center transition-all hover:shadow-lg ${
                activeCategory === "research" ? "border-green-800 shadow-lg" : "border-gray-200"
              }`}
            >
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6 text-green-800" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Research Articles</h3>
              <p className="text-gray-600 text-sm">
                In-depth scientific articles about mushroom benefits and cultivation techniques
              </p>
            </button>
            
            <button
              onClick={() => setActiveCategory("workshop")}
              className={`bg-white border rounded-xl p-6 text-center transition-all hover:shadow-lg ${
                activeCategory === "workshop" ? "border-green-800 shadow-lg" : "border-gray-200"
              }`}
            >
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-green-800" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Workshops</h3>
              <p className="text-gray-600 text-sm">
                Interactive learning sessions and hands-on mushroom growing workshops
              </p>
            </button>
            
            <button
              onClick={() => setActiveCategory("event")}
              className={`bg-white border rounded-xl p-6 text-center transition-all hover:shadow-lg ${
                activeCategory === "event" ? "border-green-800 shadow-lg" : "border-gray-200"
              }`}
            >
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-6 h-6 text-green-800" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Events</h3>
              <p className="text-gray-600 text-sm">
                Community events, webinars, and educational sessions about mushrooms
              </p>
            </button>
          </div>

          {/* Blog Posts */}
          {isLoading ? (
            <div className="text-center py-20">
              <p className="text-xl text-gray-600">Loading...</p>
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-20">
              <div className="max-w-md mx-auto bg-gradient-to-br from-green-50 to-green-100 rounded-3xl p-12 border border-green-200">
                <div className="w-20 h-20 bg-green-800 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Coming Soon</h2>
                <p className="text-gray-600 mb-6">
                  We're preparing amazing content for this section.
                </p>
                <div className="flex items-center justify-center text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-2" />
                  Stay tuned for updates
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <Link key={blog.id} to={`/blogs/${blog.id}`}>
                  <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                    {blog.image_url && (
                      <img
                        src={blog.image_url}
                        alt={blog.title}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                        <Clock className="w-4 h-4" />
                        <span>{blog.read_time}</span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {blog.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-3">
                        {blog.content}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Blogs;
