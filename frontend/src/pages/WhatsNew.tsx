import { motion } from 'framer-motion';
import { Star, Clock, Tag, TrendingUp } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';

const NEW_ARRIVALS = [
  {
    id: '1',
    name: 'Quinoa Bowl',
    description: 'Fresh and healthy quinoa bowl with mixed vegetables',
    price: 180,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=1200',
    rating: 4.8,
    isNew: true,
    category: 'Healthy Bowls'
  },
  {
    id: '2',
    name: 'Avocado Toast',
    description: 'Freshly baked sourdough with smashed avocado',
    price: 160,
    image: 'https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?auto=format&fit=crop&q=80&w=1200',
    rating: 4.6,
    isNew: true,
    category: 'Breakfast'
  }
];

const TRENDING_ITEMS = [
  {
    id: '3',
    name: 'Buddha Bowl',
    description: 'Nutritious bowl with quinoa, chickpeas, and vegetables',
    price: 220,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=1200',
    rating: 4.7,
    category: 'Healthy Bowls'
  },
  {
    id: '4',
    name: 'Smoothie Bowl',
    description: 'Açai smoothie bowl with fresh fruits and granola',
    price: 190,
    image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&q=80&w=1200',
    rating: 4.9,
    category: 'Breakfast'
  }
];

const LATEST_OFFERS = [
  {
    id: '1',
    title: 'Early Bird Special',
    description: '20% off on all breakfast items between 7 AM - 9 AM',
    validUntil: '2024-03-31',
    code: 'EARLY20'
  },
  {
    id: '2',
    title: 'Healthy Bowl Combo',
    description: 'Get a free smoothie with any healthy bowl purchase',
    validUntil: '2024-03-31',
    code: 'BOWLCOMBO'
  }
];

export function WhatsNew() {
  return (
    <div className="min-h-screen pt-16 bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-500 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white"
          >
            <h1 className="text-4xl font-bold mb-4">What's New at GHFP</h1>
            <p className="text-xl text-white/90">
              Discover our latest products, trending items, and exclusive offers
            </p>
          </motion.div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-12 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-8">
            <Star className="h-6 w-6 text-red-600" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              New Arrivals
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {NEW_ARRIVALS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Latest Offers */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-8">
            <Tag className="h-6 w-6 text-red-600" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Latest Offers
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {LATEST_OFFERS.map((offer) => (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {offer.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {offer.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Valid till {offer.validUntil}
                  </span>
                  <span className="px-3 py-1 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 rounded-full text-sm font-medium">
                    Code: {offer.code}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Now */}
      <section className="py-12 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-8">
            <TrendingUp className="h-6 w-6 text-red-600" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Trending Now
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TRENDING_ITEMS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-8">
            <Clock className="h-6 w-6 text-red-600" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Coming Soon
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative overflow-hidden rounded-lg aspect-square group"
              >
                <img
                  src={`https://images.unsplash.com/photo-${1512621776951 + item}-a57141f2eefd?auto=format&fit=crop&q=80&w=1200`}
                  alt="Coming Soon"
                  className="w-full h-full object-cover filter blur-sm group-hover:blur-0 transition-all duration-300"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-white mb-2">
                      Mystery Item #{item}
                    </h3>
                    <p className="text-white/90">Coming this April</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}