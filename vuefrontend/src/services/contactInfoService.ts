import axios from 'axios'

const API_BASE_URL = 'https://1ed1-39-63-31-174.ngrok-free.app/api/users' // Update with your backend URL

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
  // **Fetch contact info of a specific user**
  async getContactInfo(userId: number) {
    try {
      const response = await axios.get(`${API_BASE_URL}/${userId}/contact-info`, getAuthHeaders())
      return response.data // Return contact info JSON object
    } catch (error) {
      console.error('Error fetching contact info:', error)
      throw error
    }
  },

  // **Update contact info of a specific user**
  async updateContactInfo(
    userId: number,
    contactInfo: { whatsapp: string; website: string; contact: string; email: string },
  ) {
    try {
      const response = await axios.put(`${API_BASE_URL}/${userId}/contact-info`, contactInfo)
      return response.data // Return success message
    } catch (error) {
      console.error('Error updating contact info:', error)
      throw error
    }
  },
}
