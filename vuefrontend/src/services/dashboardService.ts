import axios from "axios";

const API_URL = "http://localhost:5001/api/dashboard";

export default {
  async getStats() {
    try {
      const response = await axios.get(`${API_URL}/stats`);
      return response.data;
    } catch (error: any) {
      throw error.response?.data?.message || "Failed to fetch dashboard stats";
    }
  },
};
