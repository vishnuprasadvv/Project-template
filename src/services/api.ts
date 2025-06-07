import axios from 'axios';

// Create an Axios instance with base URL and default headers
const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com', // Example API base URL
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // Request timeout in milliseconds
});

// Optional: Add request interceptors (e.g., for auth tokens)
api.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem('authToken');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Optional: Add response interceptors (e.g., for error handling)
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle global errors, e.g., redirect to login on 401
    // if (error.response && error.response.status === 401) {
    //   console.error('Unauthorized, redirecting to login...');
    //   // window.location.href = '/login';
    // }
    return Promise.reject(error);
  }
);

export const fetchPosts = async () => {
  const response = await api.get('/posts');
  return response.data;
};

export const createPost = async (newPost: { title: string; body: string; userId: number }) => {
  const response = await api.post('/posts', newPost);
  return response.data;
};
