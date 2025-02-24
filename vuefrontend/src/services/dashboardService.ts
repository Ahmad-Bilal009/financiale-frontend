import axios from "axios";

const API_URL = "https://heavy-cows-reply.loca.lt/api/dashboard";

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
