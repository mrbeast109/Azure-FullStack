function getBaseUrl() {
  let url = import.meta.env.VITE_API_URL;
  if (!url) {
    // In production, fallback to live Render backend instead of unreachable localhost
    if (import.meta.env.PROD) {
      return 'https://azure-fullstack.onrender.com/api';
    }
    return 'http://localhost:5000/api';
  }
  url = url.trim().replace(/\/+$/, '');
  if (url.startsWith('/')) {
    // Relative paths like '/api' only work when a reverse proxy is present (e.g. local Vite dev)
    // On production static sites, fallback to the full backend URL
    if (import.meta.env.PROD) {
      return 'https://azure-fullstack.onrender.com/api';
    }
    return url;
  }
  if (!/^https?:\/\//i.test(url)) {
    url = `https://${url}`;
  }
  if (!/\/api$/i.test(url)) {
    url = `${url}/api`;
  }
  return url;
}

const BASE_URL = getBaseUrl();

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

  let data = {};
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    try {
      data = await response.json();
    } catch {
      data = {};
    }
  } else {
    const text = await response.text();
    data = { message: text || `HTTP error ${response.status}: ${response.statusText}` };
  }

  if (!response.ok) {
    const err = new Error(data.message || `Request failed with status ${response.status}`);
    err.errorType = data.errorType;
    err.status = response.status;
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
