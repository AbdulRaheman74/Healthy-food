import { ShoppingCart } from 'lucide-react';
import { useStore } from '../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

export function FloatingCart() {
  const cart = useStore((state) => state.cart);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalAmount = cart.reduce(
    (acc, item) => acc + item.quantity * item.product.price,
    0
  );

  if (totalItems === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-72 bg-white rounded-lg shadow-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700"
      >
        <Link
          to="/cart"
          className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors rounded-lg"
        >
          <div className="flex items-center space-x-3">
            <div className="relative">
              <ShoppingCart className="h-6 w-6 text-red-600" />
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {totalItems} {totalItems === 1 ? 'item' : 'items'}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                ₹{totalAmount.toFixed(2)}
              </p>
            </div>
          </div>
          <span className="text-red-600 text-sm font-medium">View Cart →</span>
        </Link>
      </motion.div>
    </AnimatePresence>
  );
}