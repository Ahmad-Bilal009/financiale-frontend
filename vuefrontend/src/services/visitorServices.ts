import axios from "axios";

const API_URL = "https://1c3f-39-44-2-66.ngrok-free.app/api/visitors"; // Adjust to your backend

export default {
  incrementVisitor: (productId: number) => axios.post(`${API_URL}/increment/${productId}`),
  getTotalVisitors: () => axios.get(`${API_URL}/total`),
  getProductVisitors: (productId: number) => axios.get(`${API_URL}/product/${productId}`),
  getUserVisitors: (userId: number) => axios.get(`${API_URL}/user/${userId}`),
  getSortedVisitors: (filter: string) => axios.get(`${API_URL}/sorted?filter=${filter}`),
};
