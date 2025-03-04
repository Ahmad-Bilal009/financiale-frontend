import axios from 'axios'

const API_URL = 'https://1ed1-39-63-31-174.ngrok-free.app/api/visitors' // Adjust to your backend

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
  incrementVisitor: (productId: number) =>
    axios.post(`${API_URL}/increment/${productId}`, getAuthHeaders()),
  getTotalVisitors: () => axios.get(`${API_URL}/total`, getAuthHeaders()),
  getProductVisitors: (productId: number) =>
    axios.get(`${API_URL}/product/${productId}`, getAuthHeaders()),
  getUserVisitors: (userId: number) => axios.get(`${API_URL}/user/${userId}`, getAuthHeaders()),
  getSortedVisitors: (filter: string) =>
    axios.get(`${API_URL}/sorted?filter=${filter}`, getAuthHeaders()),
}
