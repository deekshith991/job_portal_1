import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4444',
  timeout: 10000, // Set a timeout (optional)
});

export default axiosInstance;