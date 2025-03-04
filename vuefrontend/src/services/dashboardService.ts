import axios from 'axios'
import BASE_URL from '@/config/config'

const API_URL = `${BASE_URL}/dashboard`

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
  async getStats() {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(`${API_URL}/stats`, getAuthHeaders())
      return response.data
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data?.message || 'Failed to fetch dashboard stats'
      } else {
        throw new Error('An unexpected error occurred')
      }
    }
  },

  async trackClick(action: string) {
    console.log(`Tracking click for action: ${action}`)
    try {
      // Example: Make an API call to track the click
      // await api.post('/track-click', { action });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data?.message || 'Failed to track click'
      } else {
        throw new Error('An unexpected error occurred')
      }
    }
  },
}
