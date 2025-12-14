// API service for future backend integration

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Helper function for API calls
const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  // Add auth token if available
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Product APIs
export const productAPI = {
  getAll: () => apiCall('/products'),
  getById: (id) => apiCall(`/products/${id}`),
  getByCategory: (category) => apiCall(`/products/category/${category}`),
  getByGender: (gender) => apiCall(`/products/gender/${gender}`),
};

// Cart APIs
export const cartAPI = {
  get: () => apiCall('/cart'),
  add: (productId, quantity) => apiCall('/cart', {
    method: 'POST',
    body: JSON.stringify({ productId, quantity }),
  }),
  update: (itemId, quantity) => apiCall(`/cart/${itemId}`, {
    method: 'PUT',
    body: JSON.stringify({ quantity }),
  }),
  remove: (itemId) => apiCall(`/cart/${itemId}`, {
    method: 'DELETE',
  }),
  clear: () => apiCall('/cart', {
    method: 'DELETE',
  }),
};

// Auth APIs
export const authAPI = {
  login: (email, password) => apiCall('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  }),
  register: (userData) => apiCall('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  }),
  logout: () => apiCall('/auth/logout', {
    method: 'POST',
  }),
  getProfile: () => apiCall('/auth/profile'),
};

// Order APIs
export const orderAPI = {
  create: (orderData) => apiCall('/orders', {
    method: 'POST',
    body: JSON.stringify(orderData),
  }),
  getAll: () => apiCall('/orders'),
  getById: (id) => apiCall(`/orders/${id}`),
};

