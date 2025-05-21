import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ProductGrid } from "../components/ProductGrid";
import { SearchBar } from "../components/SearchBar";
import { useStore } from "../store/useStore";
import { Loader } from "lucide-react";
import axios from "axios";

export function Products() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const { searchQuery } = useStore();

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:6060/product/getallproducts"
        );
        if (response.data.success) {
          setProducts(response.data.product); // Extract the product array from the API response
        } else {
          console.error("Failed to fetch products.");
        }
      } catch (err) {
        console.error("An error occurred while fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Search Bar */}
          <div className="w-full md:w-2/3 mx-auto">
            <SearchBar />
          </div>

          {/* Product Section */}
          <div className="space-y-6">
            {loading ? (
              <div className="h-64 flex justify-center items-center">
                <Loader className="h-10 w-10 text-red-600 animate-spin" />
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {filteredProducts.length}{" "}
                  {filteredProducts.length === 1 ? "Result" : "Results"}
                </h2>
                <ProductGrid products={filteredProducts} loading={loading} />
              </>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
