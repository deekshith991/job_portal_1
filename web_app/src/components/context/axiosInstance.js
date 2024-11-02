// src/utils/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4444', // Replace with your API server URL
  timeout: 10000, // Set a timeout (optional)
});

export default axiosInstance;

