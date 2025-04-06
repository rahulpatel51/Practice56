import axios from 'axios'

const API_BASE_URL = 'http://localhost:5000/api'

export const productApi = {
  // Get products with filters
  getProducts: async (filters: {
    search?: string
    category?: string
    status?: string
  }) => {
    const response = await axios.get(API_BASE_URL, { params: filters })
    return response.data
  },

  // Get all categories
  getCategories: async () => {
    const response = await axios.get(`${API_BASE_URL}/categories`)
    return response.data
  },

  // Create new product
  createProduct: async (formData: FormData) => {
    const response = await axios.post(API_BASE_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data
  },

  // Update product
  updateProduct: async (id: string, formData: FormData) => {
    const response = await axios.put(`${API_BASE_URL}/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data
  },

  // Delete product
  deleteProduct: async (id: string) => {
    const response = await axios.delete(`${API_BASE_URL}/${id}`)
    return response.data
  },

  // Export products
  exportProducts: async (options: {
    searchQuery?: string
    category?: string
    status?: string
    type: 'pdf' | 'excel' | 'csv' | 'json' | 'xml' | 'txt' | 'docx' | 'xlsx' | 'pptx' | 'html' | 'zip' | 'rar' | 'tar' | '7z' | 'gz' | 'bz2' | 'xz' | 'lzma' | 'lz4' | 'lzop' |    'zst' | 'zlib' | 'snappy' | 'zstd' | 'xzdec' | 'zlib-ng' | 'zlib-ng-dec' | 'zlib-ng-enc' | 'zlib-ng-gzip' | 'zlib-ng-gunzip' | 'zlib-ng-deflate' | 'zlib-ng-inflate' | 'zlib-ng-compress' | 'zlib-ng-uncompress' | 'zlib-ng-gzip-enc' | 'zlib-ng-gzip-dec' | 'zlib-ng-gzip-compress' | 'zlib-ng-gzip-uncompress' | 'zlib-ng-deflate-enc' | 'zlib-ng-deflate-dec'    | 'zlib-ng-deflate-compress' | 'zlib-ng-deflate-uncompress' | 'zlib-ng-inflate-enc' | 'zlib-ng-inflate-dec' | 'zlib-ng-inflate-compress' | 'zlib-ng-inflate-uncompress' 
  }) => {
    const response = await axios.get(`${API_BASE_URL}/export`, {
      params: options,
      responseType: 'blob'
    })
    return response.data
  }
}