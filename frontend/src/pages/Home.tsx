import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, Clock,  Smartphone, Package, Leaf } from "lucide-react";
import { Link } from "react-router-dom";
import { ProductCard } from "../components/ProductCard";
import { SearchBar } from "../components/SearchBar";

const CATEGORIES = [
  {
    id: "1",
    name: "Fresh Breads",
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=1200",
    count: 15,
  },
  {
    id: "2",
    name: "Ready to Cook",
    image:
      "https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&q=80&w=1200",
    count: 12,
  },
  {
    id: "3",
    name: "Healthy Snacks",
    image:
      "https://images.unsplash.com/photo-1562447457-579fc34967fb?auto=format&fit=crop&q=80&w=1200",
    count: 20,
  },
  {
    id: "4",
    name: "Organic Foods",
    image:
      "https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&q=80&w=1200",
    count: 18,
  },
];

const OFFERS = [
  {
    id: "1",
    title: "50% OFF on First Order",
    code: "FIRST50",
    description: "Get 50% off up to ₹100 on your first order",
    image:
      "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?auto=format&fit=crop&q=80&w=1200",
    validUntil: "2024-03-31",
  },
  {
    id: "2",
    title: "Free Delivery",
    code: "FREEDEL",
    description: "Free delivery on orders above ₹500",
    image:
      "https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&q=80&w=1200",
    validUntil: "2024-03-31",
  },
];

const TRENDING_PRODUCTS = [
  {
    id: "1",
    name: "Malabar Paratha",
    description: "Authentic South Indian layered flatbread",
    price: 35,
    image:
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=1200",
    rating: 4.5,
    isNew: true,
  },
  {
    id: "2",
    name: "Wheat Paratha",
    description: "Healthy whole wheat flatbread",
    price: 30,
    image:
      "https://www.archanaskitchen.com/images/archanaskitchen/1-Author/sibyl_sunitha/Kerala_Style_Whole_Wheat_Parotta_Recipe_.jpg",
    rating: 4.3,
  },
  {
    id: "3",
    name: "Multi-Grain Chapati",
    description: "Nutritious multi-grain flatbread",
    price: 40,
    image:
      "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&q=80&w=1200",
    rating: 4.7,
  },
  {
    id: "4",
    name: "Puri",
    description: "Deep-fried Indian bread",
    price: 25,
    image:
      "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=1200",
    rating: 4.4,
  },
];

export function Home() {
  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[70vh] max-h-[800px]">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-900/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl text-center md:text-left"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Fresh & Healthy
                <br />
                <span className="text-red-400">Food Delivered</span> Fast
              </h1>
              <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-xl">
                Daily essentials delivered in minutes. Order from local stores
                and get it
                <span className="text-red-300 font-medium">
                  {" "}
                  faster than you think!
                </span>
              </p>
              <div className="max-w-md mx-auto md:mx-0">
                <SearchBar />
              </div>
            </motion.div>
          </div>
        </div>
        <img
          src="https://img.freepik.com/premium-photo/roasted-roll-papad-is-indian-traditional-started-food-side-dish-served-with-tomato-ketchup-colourful-wooden-table-top-selective-focus_466689-63846.jpg"
          alt="Fresh ingredients"
          className="w-full h-full object-cover object-center"
          loading="eager"
        />
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
            <h2 className="text-3xl font-bold text-gray-900">
              Shop by Category
            </h2>
            <Link
              to="/products"
              className="flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors"
            >
              <span className="font-medium">Explore All</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {CATEGORIES.map((category) => (
              <motion.div
                key={category.id}
                whileHover={{ scale: 1.02 }}
                className="relative aspect-square"
              >
                <Link
                  to={`/products?category=${category.name}`}
                  className="group block h-full w-full rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent flex items-end p-4">
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold text-white">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-200 font-medium">
                        {category.count} products
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Offers Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
            <h2 className="text-3xl font-bold text-gray-900">
              Today's Best Offers
            </h2>
            <Link
              to="/offers"
              className="flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors"
            >
              <span className="font-medium">All Offers</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {OFFERS.map((offer) => (
              <motion.div
                key={offer.id}
                whileHover={{ y: -5 }}
                className="relative rounded-2xl overflow-hidden bg-gray-900 text-white"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-transparent" />
                <div className="relative flex flex-col md:flex-row items-center p-6 gap-6">
                  <div className="flex-1 space-y-3">
                    <h3 className="text-2xl font-bold">{offer.title}</h3>
                    <p className="text-gray-300">{offer.description}</p>
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="px-3 py-1.5 bg-white/10 rounded-full text-sm font-medium">
                        Use Code: {offer.code}
                      </span>
                      <span className="text-sm text-gray-400">
                        Valid till {offer.validUntil}
                      </span>
                    </div>
                  </div>
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="w-32 h-32 rounded-xl object-cover hidden md:block"
                    loading="lazy"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
            <div className="flex items-center gap-3">
              <h2 className="text-3xl font-bold text-gray-900">Trending Now</h2>
              <TrendingUp className="h-8 w-8 text-red-600" />
            </div>
            <Link
              to="/products"
              className="flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors"
            >
              <span className="font-medium">View All</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TRENDING_PRODUCTS.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                className="hover:shadow-xl transition-shadow"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-8 rounded-2xl bg-gray-50 border border-gray-100 transition-colors hover:border-red-100"
            >
              <div className="flex items-center gap-5">
                <div className="p-3 bg-red-100 rounded-xl">
                  <Clock className="h-8 w-8 text-red-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">
                    Lightning Fast Delivery
                  </h3>
                  <p className="text-gray-600">
                    Get orders delivered in 15-30 mins
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-8 rounded-2xl bg-gray-50 border border-gray-100 transition-colors hover:border-red-100"
            >
              <div className="flex items-center gap-5">
                <div className="p-3 bg-red-100 rounded-xl">
                  <Leaf className="h-8 w-8 text-red-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">Premium Quality</h3>
                  <p className="text-gray-600">100% Fresh & Natural Products</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-8 rounded-2xl bg-gray-50 border border-gray-100 transition-colors hover:border-red-100"
            >
              <div className="flex items-center gap-5">
                <div className="p-3 bg-red-100 rounded-xl">
                  <Package className="h-8 w-8 text-red-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">Easy Returns</h3>
                  <p className="text-gray-600">Hassle-free return policy</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* App Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-3xl overflow-hidden shadow-2xl">
            <div className="grid lg:grid-cols-2 items-center">
              <div className="p-12 text-white">
                <h2 className="text-4xl font-bold mb-4">
                  Get the App
                  <br />
                  <span className="text-red-100">For Faster Experience</span>
                </h2>
                <p className="text-lg text-red-50/90 mb-8">
                  Exclusive app-only deals and personalized recommendations
                </p>
                <div className="flex flex-wrap gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-3 bg-black/90 hover:bg-black px-6 py-3 rounded-xl transition-colors"
                  >
                    <Smartphone className="h-6 w-6" />
                    <div className="text-left">
                      <p className="text-xs text-gray-300">Download on</p>
                      <p className="font-bold">App Store</p>
                    </div>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-3 bg-black/90 hover:bg-black px-6 py-3 rounded-xl transition-colors"
                  >
                    <Smartphone className="h-6 w-6" />
                    <div className="text-left">
                      <p className="text-xs text-gray-300">Get it on</p>
                      <p className="font-bold">Google Play</p>
                    </div>
                  </motion.button>
                </div>
              </div>
              <div className="hidden lg:block relative h-96">
                <img
                  src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1200"
                  alt="Mobile app"
                  className="absolute h-[120%] -top-10 right-0 object-contain"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
