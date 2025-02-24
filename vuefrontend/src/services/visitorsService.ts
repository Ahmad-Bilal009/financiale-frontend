import axios from "axios";

const API_URL = "https://2f91-39-44-7-51.ngrok-free.app/api/visitorstats";

export default {
  async getVisitors() {
    try {
      const response = await axios.get(`${API_URL}/visitor`);
      return response.data;
    } catch (error: any) {
      throw error.response?.data?.message || "Failed to fetch dashboard stats";
    }
  },
};
