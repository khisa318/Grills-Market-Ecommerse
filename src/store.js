import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Auth Store - Manages user authentication state
 */
export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,

      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),

      login: (user, token) => set({ user, token, error: null }),
      logout: () => set({ user: null, token: null }),
      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-store',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
      }),
    }
  )
);

/**
 * Cart Store - Manages shopping cart state
 */
export const useCartStore = create((set) => ({
  items: [],
  coupon: null,
  addresses: [],

  addItem: (product) =>
    set((state) => {
      const existingItem = state.items.find((item) => item.id === product.id);
      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + (product.quantity || 1) }
              : item
          ),
        };
      }
      return { items: [...state.items, { ...product, quantity: product.quantity || 1 }] };
    }),

  removeItem: (productId) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== productId),
    })),

  updateQuantity: (productId, quantity) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
      ),
    })),

  setCoupon: (coupon) => set({ coupon }),
  setAddresses: (addresses) => set({ addresses }),

  clear: () => set({ items: [], coupon: null }),

  getTotal: (state) =>
    state.items.reduce((total, item) => total + item.price * item.quantity, 0),

  getItemCount: (state) => state.items.reduce((count, item) => count + item.quantity, 0),
}));

/**
 * Product Store - Manages product listing and filtering
 */
export const useProductStore = create((set) => ({
  products: [],
  loading: false,
  error: null,
  filters: {
    search: '',
    category: '',
    brand: '',
    minPrice: 0,
    maxPrice: 10000,
    sortBy: 'created_at',
    sortOrder: 'desc',
    page: 1,
    perPage: 20,
  },
  categories: [],
  brands: [],

  setProducts: (products) => set({ products }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setFilters: (filters) => set((state) => ({ filters: { ...state.filters, ...filters } })),
  setCategories: (categories) => set({ categories }),
  setBrands: (brands) => set({ brands }),
  resetFilters: () =>
    set({
      filters: {
        search: '',
        category: '',
        brand: '',
        minPrice: 0,
        maxPrice: 10000,
        sortBy: 'created_at',
        sortOrder: 'desc',
        page: 1,
        perPage: 20,
      },
    }),
}));

/**
 * Wishlist Store
 */
export const useWishlistStore = create(
  persist(
    (set) => ({
      items: [],

      addItem: (product) =>
        set((state) => ({
          items: [...new Set([...state.items, product.id])],
        })),

      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((id) => id !== productId),
        })),

      isInWishlist: (productId, state) => state.items.includes(productId),

      clear: () => set({ items: [] }),
    }),
    {
      name: 'wishlist-store',
    }
  )
);

/**
 * UI Store - Global UI state
 */
export const useUIStore = create((set) => ({
  sidebarOpen: false,
  cartOpen: false,
  notification: null,

  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setCartOpen: (open) => set({ cartOpen: open }),
  showNotification: (message, type = 'info', duration = 3000) => {
    set({ notification: { message, type, id: Date.now() } });
    setTimeout(() => set({ notification: null }), duration);
  },
  clearNotification: () => set({ notification: null }),
}));
