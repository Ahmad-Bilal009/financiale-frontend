import axios from 'axios'

const API_URL = 'http://localhost:5001/api/auth'



export default {
  async login(credentials: { email: string; password: string }) {
    try {
      const response = await axios.post(`${API_URL}/login`, credentials)
      return response.data
    } catch (error: any) {
      throw error.response?.data?.message || 'Login failed'
    }
  },
}
