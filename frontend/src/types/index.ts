export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  rating: number;
  reviews: Review[];
  discount?: number;
  isNew?: boolean;
  ingredients?: string[];
  nutritionalInfo?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  preparationTime?: number;
  shelfLife?: string;
  storageInstructions?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: 'user' | 'admin';
  addresses: Address[];
  favorites: string[];
  preferences?: {
    notifications: boolean;
    newsletter: boolean;
    dietaryRestrictions?: string[];
  };
}

export interface Address {
  id: string;
  type: 'home' | 'work' | 'other';
  street: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
  landmark?: string;
  recipientName: string;
  recipientPhone: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  images?: string[];
  likes: number;
  verified: boolean;
}

export interface DeliverySlot {
  id: string;
  startTime: string;
  endTime: string;
  available: boolean;
  maxOrders: number;
  currentOrders: number;
  price?: number;
  isExpress?: boolean;
}

export type PaymentMethod = 'cod' | 'upi' | 'card';

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered';
  deliverySlot: DeliverySlot;
  address: Address;
  paymentMethod: PaymentMethod;
  paymentStatus: 'pending' | 'completed';
  createdAt: string;
  estimatedDeliveryTime?: string;
  trackingUpdates: TrackingUpdate[];
  specialInstructions?: string;
  couponApplied?: {
    code: string;
    discount: number;
  };
}

export interface TrackingUpdate {
  status: Order['status'];
  timestamp: string;
  location?: string;
  description: string;
}

export interface Offer {
  id: string;
  code: string;
  title: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderValue?: number;
  maxDiscount?: number;
  validFrom: string;
  validUntil: string;
  usageLimit?: number;
  usageCount: number;
  applicableProducts?: string[];
  applicableCategories?: string[];
}

export type Theme = 'light' | 'dark';

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  slug: string;
  parentId?: string;
  featured: boolean;
}

export interface ProductFilter {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  sortBy?: 'price_asc' | 'price_desc' | 'rating' | 'newest';
  inStock?: boolean;
  isNew?: boolean;
  hasDiscount?: boolean;
}

export interface AdminDashboardStats {
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  topProducts: {
    product: Product;
    quantity: number;
    revenue: number;
  }[];
  recentOrders: Order[];
  stockAlerts: {
    product: Product;
    threshold: number;
  }[];
}