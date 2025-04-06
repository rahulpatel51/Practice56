import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import type { AxiosError } from 'axios';

// Setup base URL
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// API Response Wrapper
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

// Error Response Interface
interface ErrorResponse {
  message: string;
  error?: string;
  statusCode?: number;
}

// Interfaces
interface Category {
  id: string;
  name: string;
  price: number;
  quantity: number;
  description?: string;
  image?: string | File;
  createdAt?: string;
  updatedAt?: string;
}

interface Credentials {
  email: string;
  password: string;
}

interface UserData {
  name: string;
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

// Helper function for error handling
const handleApiError = (error: AxiosError<ErrorResponse>): never => {
  if (error.response) {
    // The request was made and the server responded with a status code
    throw new Error(error.response.data.message || error.response.data.error || 'An error occurred');
  } else if (error.request) {
    // The request was made but no response was received
    throw new Error('No response received from server');
  } else {
    // Something happened in setting up the request
    throw new Error(error.message);
  }
};

// ---------------------- CATEGORY API ----------------------

export const categoryApi = {
  /**
   * Get all categories
   * @returns Promise<Category[]>
   */
  getAllCategories: async (): Promise<Category[]> => {
    try {
      const response: AxiosResponse<ApiResponse<Category[]>> = await api.get('/categories');
      return response.data.data;
    } catch (error) {
      handleApiError(error as AxiosError<ErrorResponse>);
    }
    return []; // Return an empty array as a fallback
  },

  /**
   * Get single category by ID
   * @param id - Category ID
   * @returns Promise<Category>
   */
  getCategory: async (id: string): Promise<Category | undefined> => {
    try {
      const response: AxiosResponse<ApiResponse<Category>> = await api.get(`/categories/${id}`);
      return response.data.data;
    } catch (error) {
      handleApiError(error as AxiosError<ErrorResponse>);
    }
    return undefined; // Explicitly return undefined as a fallback
  },

  /**
   * Create new category
   * @param categoryData - Category data with optional image file
   * @returns Promise<Category>
   */
  createCategory: async (categoryData: Omit<Category, 'id'>): Promise<Category | undefined> => {
    try {
      const formData = new FormData();
      
      // Append all fields to formData
      Object.entries(categoryData).forEach(([key, value]) => {
        if (key === 'image' && value instanceof File) {
          formData.append('image', value);
        } else if (value !== null && value !== undefined) {
          formData.append(key, value.toString());
        }
      });

      const response: AxiosResponse<ApiResponse<Category>> = await api.post('/categories', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data.data;
    } catch (error) {
      handleApiError(error as AxiosError<ErrorResponse>);
    }
    return undefined; // Explicitly return undefined as a fallback
  },

  /**
   * Update existing category
   * @param id - Category ID
   * @param categoryData - Updated category data
   * @returns Promise<Category>
   */
  updateCategory: async (id: string, categoryData: Partial<Category>): Promise<Category | undefined> => {
    try {
      const formData = new FormData();
      
      // Append all fields to formData
      Object.entries(categoryData).forEach(([key, value]) => {
        if (key === 'image' && value instanceof File) {
          formData.append('image', value);
        } else if (value !== null && value !== undefined) {
          formData.append(key, value.toString());
        }
      });

      const response: AxiosResponse<ApiResponse<Category>> = await api.put(`/categories/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data.data;
    } catch (error) {
      handleApiError(error as AxiosError<ErrorResponse>);
    }
    return undefined; // Explicitly return undefined as a fallback
  },

  /**
   * Delete category
   * @param id - Category ID
   * @returns Promise<{ message: string }>
   */
  deleteCategory: async (id: string): Promise<{ message: string } | undefined> => {
    try {
      const response: AxiosResponse<ApiResponse<{ message: string }>> = await api.delete(`/categories/${id}`);
      return response.data.data;
    } catch (error) {
      handleApiError(error as AxiosError<ErrorResponse>);
    }
    return undefined; // Explicitly return undefined as a fallback
  },
};

// ---------------------- AUTH API ----------------------

export const authApi = {
  /**
   * User login
   * @param credentials - Email and password
   * @returns Promise<AuthResponse>
   */
  login: async (credentials: Credentials): Promise<AuthResponse | undefined> => {
    try {
      const response: AxiosResponse<ApiResponse<AuthResponse>> = await api.post('/auth/login', credentials);
      return response.data.data;
    } catch (error) {
      handleApiError(error as AxiosError<ErrorResponse>);
    }
    return undefined; // Explicitly return undefined as a fallback
  },

  /**
   * User registration
   * @param userData - User registration data
   * @returns Promise<{ message: string }>
   */
  register: async (userData: UserData): Promise<{ message: string } | undefined> => {
    try {
      const response: AxiosResponse<ApiResponse<{ message: string }>> = await api.post('/auth/register', userData);
      return response.data.data;
    } catch (error) {
      handleApiError(error as AxiosError<ErrorResponse>);
    }
  },
};