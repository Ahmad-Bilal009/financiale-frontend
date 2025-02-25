import axios from 'axios';

const API_URL = 'https://574e-39-44-2-66.ngrok-free.app/api/dashboard';

export default {
  async getStats() {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/stats`, {
        headers: {
          'ngrok-skip-browser-warning': 'true', // Bypass Ngrok security warning
          Authorization: `Bearer ${token}`, // Include authentication token
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data?.message || 'Failed to fetch dashboard stats';
      } else {
        throw new Error('An unexpected error occurred');
      }
    }
  },

  async trackClick(action: string) {
    console.log(`Tracking click for action: ${action}`);
    try {
      // Example: Make an API call to track the click
      // await api.post('/track-click', { action });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data?.message || 'Failed to track click';
      } else {
        throw new Error('An unexpected error occurred');
      }
    }
  },
};
