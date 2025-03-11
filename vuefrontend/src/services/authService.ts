import axios from 'axios'
import BASE_URL from '@/config/config'

const API_URL = `${BASE_URL}/auth`

export default {
  /**
   * User Login
   */
  async login(credentials: { email: string; password: string }) {
    try {
      const response = await axios.post(`${API_URL}/login`, credentials)
      return response.data
    } catch (error: any) {
      throw error.response?.data?.message || 'Login failed'
    }
  },

  /**
   * Forgot Password - Request OTP
   */
  async forgotPassword(email: string) {
    try {
      const response = await axios.post(`${API_URL}/forgot-password`, { email })
      return response.data
    } catch (error: any) {
      throw error.response?.data?.message || 'Failed to send OTP'
    }
  },

  /**
   * Verify OTP
   */
  async verifyOtp(email: string, otp: string) {
    try {
      const response = await axios.post(`${API_URL}/verify-otp`, { email, otp })
      return response.data
    } catch (error: any) {
      throw error.response?.data?.message || 'Invalid or expired OTP'
    }
  },

  /**
   * Reset Password
   */
  async resetPassword(email: string, otp: string, newPassword: string) {
    try {
      const response = await axios.post(`${API_URL}/reset-password`, { email, otp, newPassword })
      return response.data
    } catch (error: any) {
      throw error.response?.data?.message || 'Password reset failed'
    }
  },
}
