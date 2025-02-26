import axios from 'axios'

const API_URL = 'http://localhost:5001/api/products'

const getAuthHeaders = () => {
  const token = localStorage.getItem('token') // Retrieve the token from localStorage
  return {
    headers: {
      'ngrok-skip-browser-warning': 'true', // Bypass Ngrok warning
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }
}

export default {
  //  Fetch all products
  async getProducts() {
    try {
      const response = await axios.get(API_URL, getAuthHeaders())
      return response.data
    } catch (error: any) {
      throw error.response?.data?.message || 'Failed to fetch products'
    }
  },

  //  Fetch a single product by ID
  async getProductById(productId: number) {
    try {
      const response = await axios.get(`${API_URL}/${productId}`, getAuthHeaders())
      return response.data
    } catch (error: any) {
      throw error.response?.data?.message || 'Failed to fetch product details'
    }
  },

  //  Create or Update a Product
  async saveProduct(productData: any, productId?: number) {
    try {
      let response
      if (productId) {
        //  Update Product (PUT)
        response = await axios.put(`${API_URL}/${productId}`, productData, getAuthHeaders())
      } else {
        //  Create Product (POST)
        response = await axios.post(API_URL, productData, getAuthHeaders())
      }
      return response.data
    } catch (error: any) {
      throw error.response?.data?.message || 'Failed to save product'
    }
  },

  //  Delete a Product
  async deleteProduct(productId: number) {
    try {
      const response = await axios.delete(`${API_URL}/${productId}`, getAuthHeaders())
      return response.data
    } catch (error: any) {
      throw error.response?.data?.message || 'Failed to delete product'
    }
  },

  //  Toggle Product Status (Approve/Reject/Pending)
  async updateProductStatus(productId: number, status: string) {
    try {
      const response = await axios.patch(`${API_URL}/${productId}`, { status }, getAuthHeaders())
      return response.data
    } catch (error: any) {
      throw error.response?.data?.message || 'Failed to update product status'
    }
  },
}
