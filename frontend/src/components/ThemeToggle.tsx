import { Sun, Moon } from 'lucide-react';
import { useStore } from '../store/useStore';
import { motion } from 'framer-motion';

export function ThemeToggle() {
  const { theme, toggleTheme } = useStore();

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      {theme === 'light' ? (
        <Moon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
      ) : (
        <Sun className="h-5 w-5 text-gray-400" />
      )}
    </motion.button>
  );
}