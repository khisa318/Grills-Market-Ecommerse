import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

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
  const token = localStorage.getItem('authToken');
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
      localStorage.removeItem('user');
      window.location.href = '/auth';
    }
    return Promise.reject(error);
  }
);

export const api = {
  // ==================== PRODUCTS ====================
  getProducts: (params = {}) =>
    axiosInstance.get('/products', { params }).then(res => res.data),

  getProductBySlug: (slug) =>
    axiosInstance.get(`/products/${slug}`).then(res => res.data),

  getCategories: () =>
    axiosInstance.get('/products/categories').then(res => res.data),

  getBrands: () =>
    axiosInstance.get('/products/brands').then(res => res.data),

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

  // ==================== ADMIN ====================
  createProduct: (productData) =>
    axiosInstance.post('/admin/products', productData).then(res => res.data),

  updateProduct: (productId, productData) =>
    axiosInstance.put(`/admin/products/${productId}`, productData).then(res => res.data),

  updateInventory: (productId, quantityChange, reason, referenceId) =>
    axiosInstance.post(`/admin/inventory/${productId}`, {
      quantity_change: quantityChange,
      reason,
      reference_id: referenceId,
    }).then(res => res.data),

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
