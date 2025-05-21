import { ShoppingCart, User, Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useStore } from "../store/useStore";
import { motion } from "framer-motion";
import { useState } from "react";
import logo from "../assets/logoRemovedBG.png";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cart = useStore((state) => state.cart);
  const user = useStore((state) => state.user);
  const location = useLocation();

  const navLinks = [
    { path: "/products", label: "Products" },
    { path: "/whats-new", label: "What's New" },
  ];

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Section */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center">
              <img
                src={logo}
                alt="Company Logo"
                className="h-20 w-20  object-contain"
              />
              <span className="text-red-600 text-xl md:text-2xl font-bold ml-3 hidden md:block">
                Good Healthy Food
              </span>
            </Link>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-6">
            {/* Cart Icon (Always visible) */}
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-6 w-6 text-gray-700 dark:text-gray-300 hover:text-red-600 transition-colors" />
              {cart.length > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                >
                  {cart.reduce((acc, item) => acc + item.quantity, 0)}
                </motion.span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="sm:hidden text-gray-700 dark:text-gray-300 hover:text-red-600 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </button>

            {/* Desktop User Icon */}
            <Link to={user ? "/dashboard" : "/login"} className="hidden sm:block">
              <User className="h-6 w-6 text-gray-700 dark:text-gray-300 hover:text-red-600 transition-colors" />
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          className="sm:hidden"
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: mobileMenuOpen ? 1 : 0,
            height: mobileMenuOpen ? "auto" : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col space-y-4 pb-4 border-b border-gray-200 dark:border-gray-700">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={closeMobileMenu}
                className={`py-3 px-4 text-lg font-medium transition-colors ${
                  location.pathname === link.path
                    ? "text-red-600 bg-gray-100 dark:bg-gray-800"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile Account Link */}
            <Link
              to={user ? "/dashboard" : "/login"}
              onClick={closeMobileMenu}
              className="py-3 px-4 text-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Account
            </Link>
          </div>
        </motion.div>
      </div>
    </nav>
  );
}

// Active Link Component
const NavLink = ({ to, label, isActive }) => (
  <Link
    to={to}
    className={`text-lg font-medium transition-colors ${
      isActive
        ? "text-red-600 border-b-2 border-red-600 pb-1"
        : "text-gray-700 dark:text-gray-300 hover:text-red-600"
    }`}
  >
    {label}
  </Link>
);
