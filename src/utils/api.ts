const API_BASE = import.meta.env.VITE_BACKEND_URL;
const API_PREFIX = import.meta.env.VITE_API_PREFIX;

export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: `${API_BASE}${API_PREFIX}/auth/login`,
  VERIFY_TOKEN: `${API_BASE}${API_PREFIX}/auth/verify-token`,
  REFRESH_TOKEN: `${API_BASE}${API_PREFIX}/auth/refresh-token`,
  LOGOUT: `${API_BASE}${API_PREFIX}/auth/logout`,
  UPDATE_PROFILE: `${API_BASE}${API_PREFIX}/auth/profile`,
  
  // SDN endpoints
  SEARCH_SDN: `${API_BASE}${API_PREFIX}/sdn/search`,
  SDN_LIST: `${API_BASE}${API_PREFIX}/sdn/list`,
  UPDATE_SDN: `${API_BASE}${API_PREFIX}/sdn/update`,
  
  // SWIFT endpoints
  PROCESS_SWIFT: `${API_BASE}${API_PREFIX}/swift/process-swift`,
  PARSED_FILES: `${API_BASE}${API_PREFIX}/swift/parsed-swift-files`,
  SEARCH_ORGINFO: `${API_BASE}${API_PREFIX}/swift/search-orginfo`,
  SEARCH_EGRUL: `${API_BASE}${API_PREFIX}/swift/search-egrul`,
  SEARCH_SWIFT: `${API_BASE}${API_PREFIX}/swift/search-swift`,
  UPDATE_STATUS: (id: string) => `${API_BASE}${API_PREFIX}/swift/update-status/${id}`,
  DELETE_MESSAGE: (id: string) => `${API_BASE}${API_PREFIX}/swift/delete-message/${id}`,
  
  // Entity checking endpoints
  CHECK_ENTITY: `${API_BASE}${API_PREFIX}/sdn/search`,
  CHECK_INN: `${API_BASE}${API_PREFIX}/sdn/search`,
  
  // Entity management endpoints
  GET_ENTITIES: `${API_BASE}${API_PREFIX}/entities`,
  CREATE_ENTITY: `${API_BASE}${API_PREFIX}/entities`,
  DELETE_ENTITY: (id: string) => `${API_BASE}${API_PREFIX}/entities/${id}`,
  UPDATE_ENTITY: (id: string) => `${API_BASE}${API_PREFIX}/entities/${id}`,
  USERS: `${API_BASE}${API_PREFIX}/users`,
  CREATE_USER: `${API_BASE}${API_PREFIX}/users`,
  UPDATE_USER: (id: string) => `${API_BASE}${API_PREFIX}/users/${id}`,
  DELETE_USER: (id: string) => `${API_BASE}${API_PREFIX}/users/${id}`,
  CREATE_BLACKLIST: `${API_BASE}${API_PREFIX}/blacklist`,
  UPDATE_BLACKLIST: (id: string) => `${API_BASE}${API_PREFIX}/blacklist/${id}`,
  DELETE_BLACKLIST: (id: string) => `${API_BASE}${API_PREFIX}/blacklist/${id}`,
} as const;

import axios from 'axios';
export const apiClient = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add a response interceptor
apiClient.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // If error is 401 and we haven't tried to refresh token yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to refresh token
        const response = await apiClient.post(API_ENDPOINTS.REFRESH_TOKEN);
        const { token, user } = response.data;
        
        // Update token and user in localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        
        // Update auth header
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        // Retry the original request
        return apiClient(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
); 

export const refreshToken = async () => {
    try {
        const response = await apiClient.post('/auth/refresh-token', {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('refreshToken')}`,
            },
        });
        localStorage.setItem('accessToken', response.data.accessToken);
        console.log('Token refreshed:', response.data);
    } catch (error) {
        console.error('Token refresh failed:', error);
        window.location.href = '/login';  // Redirect to login on failure
    }
}; 