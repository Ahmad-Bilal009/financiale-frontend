import axios from "axios";

const API_URL = "http://localhost:5001/api/visitorstats";

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
