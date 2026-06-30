import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
const CATALOG_CACHE_PREFIX = 'catalog-cache:';
const CATALOG_CACHE_TTL_MS = 5 * 60 * 1000;

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken') || localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

// Handle response errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token and redirect to login
      localStorage.removeItem('authToken');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/auth';
    }
    return Promise.reject(error);
  }
);

const normalizeParams = (params = {}) => {
  if (typeof params === 'string') {
    return params.trim() ? { search: params.trim() } : {};
  }

  return Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== null && value !== '')
  );
};

const cacheKey = (path, params = {}) => {
  const searchParams = new URLSearchParams();
  Object.entries(normalizeParams(params))
    .sort(([a], [b]) => a.localeCompare(b))
    .forEach(([key, value]) => searchParams.set(key, String(value)));

  const query = searchParams.toString();
  return `${CATALOG_CACHE_PREFIX}${path}${query ? `?${query}` : ''}`;
};

const readCatalogCache = (key) => {
  try {
    const cached = sessionStorage.getItem(key);
    if (!cached) return null;

    const entry = JSON.parse(cached);
    if (!entry?.expiresAt || entry.expiresAt < Date.now()) {
      sessionStorage.removeItem(key);
      return null;
    }

    return entry.value;
  } catch {
    sessionStorage.removeItem(key);
    return null;
  }
};

const writeCatalogCache = (key, value) => {
  try {
    sessionStorage.setItem(
      key,
      JSON.stringify({
        value,
        expiresAt: Date.now() + CATALOG_CACHE_TTL_MS,
      })
    );
  } catch {
    // Storage can be full or unavailable in private browsing; the API should still work.
  }
};

const clearCatalogCache = () => {
  Object.keys(sessionStorage)
    .filter((key) => key.startsWith(CATALOG_CACHE_PREFIX))
    .forEach((key) => sessionStorage.removeItem(key));
};

const cachedGet = async (path, params = {}) => {
  const normalizedParams = normalizeParams(params);
  const key = cacheKey(path, normalizedParams);
  const cached = readCatalogCache(key);

  if (cached) return cached;

  const response = await axiosInstance.get(path, { params: normalizedParams });
  writeCatalogCache(key, response.data);
  return response.data;
};

const toFeatureArray = (features) => {
  if (Array.isArray(features)) return features;
  if (typeof features !== 'string') return [];

  return features
    .split(',')
    .map((feature) => feature.trim())
    .filter(Boolean);
};

const normalizeProduct = (product) => {
  if (!product) return product;

  const imageUrl = product.image_url || product.imageUrl || '';
  const averageRating = Number(product.average_rating ?? product.rating ?? 5);

  return {
    ...product,
    image_url: imageUrl,
    imageUrl,
    originalPrice: product.original_price ?? product.originalPrice ?? null,
    stockQuantity: product.stock_quantity ?? product.stockQuantity ?? 0,
    inStock: product.in_stock ?? product.inStock ?? false,
    reviewCount: product.reviews_count ?? product.reviewCount ?? 0,
    rating: Number.isFinite(averageRating) ? Math.max(0, Math.min(5, Math.round(averageRating))) : 0,
    features: toFeatureArray(product.features),
  };
};

const normalizeProductList = (payload) => {
  const products = Array.isArray(payload) ? payload : payload?.data;
  const normalized = Array.isArray(products) ? products.map(normalizeProduct) : [];

  if (payload?.pagination) {
    Object.defineProperty(normalized, 'pagination', {
      value: payload.pagination,
      enumerable: false,
    });
  }

  return normalized;
};

export const api = {
  // ==================== PRODUCTS ====================
  getProducts: (params = {}) =>
    cachedGet('/products', params).then(normalizeProductList),

  getProductPage: (params = {}) =>
    cachedGet('/products', params).then((payload) => ({
      data: normalizeProductList(payload),
      pagination: payload?.pagination ?? null,
    })),

  getProductBySlug: (slug) =>
    cachedGet(`/products/${slug}`).then(normalizeProduct),

  getCategories: () =>
    cachedGet('/products/categories'),

  getBrands: () =>
    cachedGet('/products/brands'),

  // ==================== AUTH ====================
  register: (email, username, password, firstName, lastName) =>
    axiosInstance.post('/auth/register', {
      email,
      username,
      password,
      first_name: firstName,
      last_name: lastName,
    }).then(res => res.data),

  login: (email, password) =>
    axiosInstance.post('/auth/login', { email, password }).then(res => res.data),

  getProfile: () =>
    axiosInstance.get('/auth/profile').then(res => res.data),

  updateProfile: (data) =>
    axiosInstance.put('/auth/profile', data).then(res => res.data),

  changePassword: (oldPassword, newPassword) =>
    axiosInstance.post('/auth/change-password', {
      old_password: oldPassword,
      new_password: newPassword,
    }).then(res => res.data),

  // ==================== ADDRESSES ====================
  getAddresses: () =>
    axiosInstance.get('/cart/addresses').then(res => res.data),

  addAddress: (addressData) =>
    axiosInstance.post('/cart/addresses', addressData).then(res => res.data),

  deleteAddress: (addressId) =>
    axiosInstance.delete(`/cart/addresses/${addressId}`).then(res => res.data),

  // ==================== ORDERS ====================
  getOrders: (page = 1, perPage = 10) =>
    axiosInstance.get('/orders', { params: { page, per_page: perPage } }).then(res => res.data),

  getOrderById: (orderId) =>
    axiosInstance.get(`/orders/${orderId}`).then(res => res.data),

  createOrder: (items, addressId, couponCode = null) =>
    axiosInstance.post('/orders/create', {
      items,
      address_id: addressId,
      coupon_code: couponCode,
    }).then(res => res.data),

  cancelOrder: (orderId) =>
    axiosInstance.post(`/orders/${orderId}/cancel`).then(res => res.data),

  // ==================== REVIEWS ====================
  getProductReviews: (productId, page = 1, perPage = 10, sort = 'newest') =>
    axiosInstance.get(`/products/${productId}/reviews`, {
      params: { page, per_page: perPage, sort },
    }).then(res => res.data),

  createReview: (productId, rating, title, comment) =>
    axiosInstance.post(`/products/${productId}/reviews`, {
      rating,
      title,
      comment,
    }).then(res => res.data),

  deleteReview: (reviewId) =>
    axiosInstance.delete(`/reviews/${reviewId}`).then(res => res.data),

  // ==================== WISHLIST ====================
  getWishlist: () =>
    axiosInstance.get('/wishlist').then(res => res.data),

  addToWishlist: (productId) =>
    axiosInstance.post(`/wishlist/${productId}`).then(res => res.data),

  removeFromWishlist: (itemId) =>
    axiosInstance.delete(`/wishlist/${itemId}`).then(res => res.data),

  // ==================== CART ====================
  validateCoupon: (code, subtotal) =>
    axiosInstance.post('/cart/validate-coupon', {
      code,
      subtotal,
    }).then(res => res.data),

  // ==================== PAYMENTS ====================
  createPaymentCheckout: (checkoutData) =>
    axiosInstance.post('/payments/checkout', checkoutData).then(res => res.data),

  getPaymentStatus: (reference) =>
    axiosInstance.get(`/payments/${reference}`).then(res => res.data),

  // ==================== ADMIN ====================
  createProduct: (productData) =>
    axiosInstance.post('/admin/products', productData).then((res) => {
      clearCatalogCache();
      return res.data;
    }),

  updateProduct: (productId, productData) =>
    axiosInstance.put(`/admin/products/${productId}`, productData).then((res) => {
      clearCatalogCache();
      return res.data;
    }),

  updateInventory: (productId, quantityChange, reason, referenceId) =>
    axiosInstance.post(`/admin/inventory/${productId}`, {
      quantity_change: quantityChange,
      reason,
      reference_id: referenceId,
    }).then((res) => {
      clearCatalogCache();
      return res.data;
    }),

  updateOrderStatus: (orderId, status, notes = '', trackingNumber = '') =>
    axiosInstance.put(`/admin/orders/${orderId}/status`, {
      status,
      notes,
      tracking_number: trackingNumber,
    }).then(res => res.data),

  createCoupon: (couponData) =>
    axiosInstance.post('/admin/coupons', couponData).then(res => res.data),

  getDashboardStats: () =>
    axiosInstance.get('/admin/dashboard/stats').then(res => res.data),
};
