import axios from 'axios'
import BASE_URL from '@/config/config'

const API_URL = `${BASE_URL}/auth`

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
