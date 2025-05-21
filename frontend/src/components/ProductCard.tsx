import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Product } from "../types";
import { useStore } from "../store/useStore";
import { useNavigate } from "react-router-dom";

// Define the Product type based on the API response
interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addToCart = useStore((state) => state.addToCart);
  const navigate = useNavigate();

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => navigate(`/products/${product._id}`)}
    >
      {/* Image Container */}
      <div className="relative aspect-square">
        <img
          src={product.image[0]} // Use the first image URL from the array
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Product Details */}
      <div className="p-4 space-y-3">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 min-h-[3.75rem]">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-yellow-500">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {product.stock > 0 ? "In Stock" : "Out of Stock"}
            </span>
          </div>
          <span className="text-lg font-bold text-red-600 dark:text-red-400">
            ₹{product.price.toFixed(2)}
          </span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent card click event from triggering
            addToCart(product);
          }}
          className="w-full bg-red-600 text-white py-2.5 rounded-lg transition-colors duration-300 hover:bg-red-700"
        >
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
}
