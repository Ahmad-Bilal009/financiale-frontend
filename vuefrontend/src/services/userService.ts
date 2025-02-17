import axios from 'axios'

const API_URL = 'http://localhost:5001/api/admin/users'

const getAuthHeaders = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
})

export default {
  //  Fetch all users
  async getUsers() {
    try {
      const response = await axios.get(API_URL, getAuthHeaders())

      //  Ensure isDisabled is always a Boolean
      return response.data.map((user: any) => ({
        ...user,
        isDisabled: Boolean(user.isDisabled), // Convert 1/0 to true/false
      }))
    } catch (error: any) {
      throw error.response?.data?.message || 'Failed to fetch users'
    }
  },

  //  Add or Update User (With Image Upload Support)
  async saveUser(
    userData: {
      name: string
      email: string
      password?: string
      role?: string
      image?: File | null
    },
    userId?: number,
  ) {
    try {
      const formData = new FormData()
      formData.append('name', userData.name)
      formData.append('email', userData.email)
      if (userData.password) formData.append('password', userData.password) // Only send password if provided
      if (userData.role) formData.append('role', userData.role)
      if (userData.image) formData.append('image', userData.image) // Append image if exists

      let response
      if (userId) {
        //  Update User (PUT)
        response = await axios.put(`${API_URL}/${userId}`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data',
          },
        })
      } else {
        //  Create User (POST)
        response = await axios.post(API_URL, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data',
          },
        })
      }
      return response.data
    } catch (error: any) {
      throw error.response?.data?.message || 'Failed to save user'
    }
  },

  //  Delete user
  async deleteUser(userId: number) {
    try {
      const response = await axios.delete(`${API_URL}/${userId}`, getAuthHeaders())
      return response.data
    } catch (error: any) {
      throw error.response?.data?.message || 'Failed to delete user'
    }
  },

  //  Toggle user enable/disable
  async toggleUserStatus(userId: number) {
    try {
      console.log(`🔄 Toggling status for user ID: ${userId}`) // Debugging

      //  API Call
      const response = await axios.put(`${API_URL}/${userId}/toggle-disable`, {}, getAuthHeaders())
      console.log(' Toggle API Response:', response.data) // Debugging

      return response.data // Ensure we return updated data
    } catch (error: any) {
      console.error(' Failed to update user status:', error.response?.data || error.message)
      throw error.response?.data?.message || 'Failed to update user status'
    }
  },
}
