const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

async function request(endpoint, options = {}) {
  const token = localStorage.getItem('azureToken');

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  if (options.body instanceof FormData) {
    delete headers['Content-Type'];
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    const err = new Error(data.message || 'Request failed');
    err.errorType = data.errorType;
    err.success = false;
    throw err;
  }

  return data;
}

export const authAPI = {
  signup: (email, password) =>
    request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  login: (email, password) =>
    request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  getMe: () => request('/auth/me'),
};

export const productsAPI = {
  getAll: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return request(`/products${qs ? `?${qs}` : ''}`);
  },

  getById: (id) => request(`/products/${id}`),

  create: (formData) =>
    request('/products', { method: 'POST', body: formData }),

  update: (id, formData) =>
    request(`/products/${id}`, { method: 'PUT', body: formData }),

  delete: (id) => request(`/products/${id}`, { method: 'DELETE' }),

  seed: (products) =>
    request('/products/seed', {
      method: 'POST',
      body: JSON.stringify({ products }),
    }),
};

export const ordersAPI = {
  create: (orderData) =>
    request('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    }),

  getMyOrders: () => request('/orders/my'),

  getById: (id) => request(`/orders/${id}`),
};

export default { authAPI, productsAPI, ordersAPI };
