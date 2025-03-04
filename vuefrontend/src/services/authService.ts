import axios from 'axios'

const API_URL = 'https://cf42-39-63-31-174.ngrok-free.app/api/auth'

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
