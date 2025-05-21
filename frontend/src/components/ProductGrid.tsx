import { motion } from "framer-motion";
import { ProductCard } from "./ProductCard";
import { Product } from "../types";

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
}

export function ProductGrid({ products, loading }: ProductGridProps) {
  const renderSkeleton = () => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {[...Array(10)].map((_, index) => (
        <div key={index} className="space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 animate-pulse">
            <div className="aspect-square w-full bg-gray-200 dark:bg-gray-700 rounded-lg mb-4" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4" />
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );

  const renderEmptyState = () => (
    <div className="flex flex-col items-center justify-center py-16 space-y-6">
      <div className="text-7xl text-red-600 dark:text-red-400">🛒</div>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
        No Products Found
      </h3>
      <p className="text-gray-600 dark:text-gray-400 max-w-md text-center px-4">
        Try adjusting your search terms or check back later.
      </p>
    </div>
  );

  const renderProductGrid = () => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {products.map((product) => (
        <motion.div
          key={product._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          whileHover={{ scale: 1.02 }}
          className="cursor-pointer"
        >
          <ProductCard product={product} />
        </motion.div>
      ))}
    </div>
  );

  return (
    <div className="relative">
      {loading && renderSkeleton()}
      {!loading && products.length === 0 && renderEmptyState()}
      {!loading && products.length > 0 && renderProductGrid()}
    </div>
  );
}