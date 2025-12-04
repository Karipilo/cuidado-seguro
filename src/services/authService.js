import axios from "axios";
import { API_URL } from "../config/api";

const API = `${API_URL}/api/auth`;

export const login = async (email, password) => {
  const response = await axios.post(`${API}/login`, {
    email,
    password
  });
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await axios.post(`${API}/registro`, userData);
  return response.data;
};
