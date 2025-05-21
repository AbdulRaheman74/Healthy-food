import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product, User, Theme, Order, ProductFilter, Offer } from '../types';

interface Store {
  // Cart State
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;

  // User State
  user: User | null;
  setUser: (user: User | null) => void;
  addToFavorites: (productId: string) => void;
  removeFromFavorites: (productId: string) => void;
  updateUserPreferences: (preferences: User['preferences']) => void;

  // Theme State
  theme: Theme;
  toggleTheme: () => void;

  // Search & Filter State
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filters: ProductFilter;
  setFilters: (filters: ProductFilter) => void;

  // Orders State
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;

  // Offers State
  offers: Offer[];
  setOffers: (offers: Offer[]) => void;
  applyOffer: (code: string) => boolean;

  // Admin State
  selectedProducts: string[];
  setSelectedProducts: (productIds: string[]) => void;
  bulkUpdateProducts: (updates: Partial<Product>) => void;
}

export const useStore = create<Store>()(
  persist(
    (set) => ({
      // Cart Implementation
      cart: [],
      addToCart: (product) =>
        set((state) => {
          const existingItem = state.cart.find((item) => item.product.id === product.id);
          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }
          return { cart: [...state.cart, { product, quantity: 1 }] };
        }),
      removeFromCart: (productId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.product.id !== productId),
        })),
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        })),
      clearCart: () => set({ cart: [] }),

      // User Implementation
      user: null,
      setUser: (user) => set({ user }),
      addToFavorites: (productId) =>
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                favorites: [...state.user.favorites, productId],
              }
            : null,
        })),
      removeFromFavorites: (productId) =>
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                favorites: state.user.favorites.filter((id) => id !== productId),
              }
            : null,
        })),
      updateUserPreferences: (preferences) =>
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                preferences: { ...state.user.preferences, ...preferences },
              }
            : null,
        })),

      // Theme Implementation
      theme: 'light',
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'light' ? 'dark' : 'light',
        })),

      // Search & Filter Implementation
      searchQuery: '',
      setSearchQuery: (query) => set({ searchQuery: query }),
      filters: {},
      setFilters: (filters) => set({ filters }),

      // Orders Implementation
      orders: [],
      addOrder: (order) =>
        set((state) => ({
          orders: [...state.orders, order],
        })),
      updateOrderStatus: (orderId, status) =>
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === orderId ? { ...order, status } : order
          ),
        })),

      // Offers Implementation
      offers: [],
      setOffers: (offers) => set({ offers }),
      applyOffer: (code) =>
        set((state) => {
          const offer = state.offers.find((o) => o.code === code);
          if (!offer) return false;
          // Implement offer validation and application logic
          return true;
        }),

      // Admin Implementation
      selectedProducts: [],
      setSelectedProducts: (productIds) => set({ selectedProducts: productIds }),
      bulkUpdateProducts: (updates) =>
        set((state) => {
          // Implement bulk update logic
          return state;
        }),
    }),
    {
      name: 'ghfp-store',
      partialize: (state) => ({
        cart: state.cart,
        theme: state.theme,
        user: state.user,
      }),
    }
  )
);