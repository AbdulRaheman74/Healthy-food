import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Star, Heart, ShoppingCart, Clock, Package, Truck } from 'lucide-react';
import { useStore } from '../store/useStore';

// TypeScript Interfaces for API Response
interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
  likes: number;
}

interface NutritionalInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface Product {
  _id: string;
  name: string;
  image: string[];
  price: number;
  description: string;
  category: string;
  stock: number;
  rating: number;
  reviews: Review[];
  nutritionalInfo: NutritionalInfo;
  ingredients: string[];
  preparationTime: number;
  shelfLife: string;
  storageInstructions: string;
}

interface ApiResponse {
  success: boolean;
  product: Product;
}

export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<number>(0);

  // Global store hooks
  const { addToCart, user, addToFavorites, removeFromFavorites } = useStore();

  // Fetch product data using Axios
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get<ApiResponse>(`http://localhost:6060/product/getone/${id}`);
        if (response.data.success) {
          setProduct(response.data.product);
        } else {
          throw new Error('Product not found');
        }
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch product');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // Check if product is in favorites (with fallback for undefined favorites)
  const isFavorite = user?.favorites?.includes(product?._id) || false;

  // Toggle favorite status
  const toggleFavorite = () => {
    if (!product) return;

    if (isFavorite) {
      removeFromFavorites(product._id);
    } else {
      addToFavorites(product._id);
    }
  };

  // Handle loading state
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  // Handle error state
  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-600">{error}</div>;
  }

  // Handle no product found
  if (!product) {
    return <div className="min-h-screen flex items-center justify-center">Product not found</div>;
  }

  return (
    <div className="min-h-screen pt-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg"
        >
          {/* Image Gallery and Product Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            {/* Image Gallery */}
            <div className="space-y-6">
              <div className="aspect-w-1 aspect-h-1 rounded-2xl overflow-hidden">
                <img
                  src={product.image[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                {product.image.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative rounded-lg overflow-hidden ${
                      selectedImage === index
                        ? 'ring-2 ring-red-500 ring-offset-2'
                        : 'ring-1 ring-gray-200 dark:ring-gray-700'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover transition-opacity duration-300"
                    />
                    {selectedImage === index && (
                      <div className="absolute inset-0 bg-black/10" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {product.name}
                </h1>
                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={index}
                        className={`h-6 w-6 ${
                          index < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    ({(product.reviews || []).length} reviews)
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
                  {product.description}
                </p>
              </div>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-4xl font-bold text-red-600">
                      ₹{product.price}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400 ml-3">
                      per piece
                    </span>
                  </div>
                  <button
                    onClick={toggleFavorite}
                    className={`p-3 rounded-full transition-colors ${
                      isFavorite
                        ? 'bg-red-100 text-red-600 dark:bg-red-900/20'
                        : 'bg-gray-100 text-gray-500 dark:bg-gray-700 hover:bg-red-50 dark:hover:bg-red-900/30'
                    }`}
                    aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    <Heart
                      className={`h-6 w-6 ${
                        isFavorite ? 'fill-current' : ''
                      }`}
                    />
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <Clock className="h-6 w-6 text-red-500" />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {product.preparationTime} mins
                      </div>
                      <div className="text-sm">Preparation Time</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <Package className="h-6 w-6 text-red-500" />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {product.shelfLife}
                      </div>
                      <div className="text-sm">Shelf Life</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <Truck className="h-6 w-6 text-red-500" />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        Free
                      </div>
                      <div className="text-sm">Delivery</div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => addToCart(product)}
                  className="w-full bg-red-600 text-white py-3.5 px-6 rounded-lg flex items-center justify-center gap-3 hover:bg-red-700 transition-colors"
                >
                  <ShoppingCart className="h-6 w-6" />
                  <span className="text-lg font-medium">Add to Cart</span>
                </button>
              </div>
            </div>
          </div>

          {/* Product Specifications */}
          <div className="border-t border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Nutritional Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(product.nutritionalInfo || {}).map(([key, value]) => (
                    <div
                      key={key}
                      className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-center"
                    >
                      <div className="text-2xl font-bold text-red-600">
                        {value}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                        {key}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="md:col-span-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Ingredients
                </h3>
                <div className="flex flex-wrap gap-3">
                  {(product.ingredients || []).map((ingredient, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 bg-red-50 dark:bg-red-900/20 rounded-full text-sm text-red-600 dark:text-red-400 font-medium"
                    >
                      {ingredient}
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Storage Instructions
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {product.storageInstructions}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Customer Reviews ({(product.reviews || []).length})
            </h2>
            <div className="space-y-8">
              {(product.reviews || []).length > 0 ? (
                (product.reviews || []).map((review) => (
                  <div
                    key={review.id}
                    className="p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                          <span className="text-red-600 text-xl font-bold">
                            {review.userName[0]}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {review.userName}
                          </div>
                          {review.verified && (
                            <div className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full inline-block">
                              Verified Purchase
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {review.date}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          key={index}
                          className={`h-5 w-5 ${
                            index < review.rating
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      {review.comment}
                    </p>
                    <div className="flex items-center gap-6 text-gray-600 dark:text-gray-400">
                      <button className="flex items-center gap-1 hover:text-red-600 dark:hover:text-red-400">
                        <Heart className="h-4 w-4" />
                        Helpful ({review.likes})
                      </button>
                      <button className="hover:text-red-600 dark:hover:text-red-400">
                        Report
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-gray-600 dark:text-gray-400">
                  No reviews available for this product.
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}