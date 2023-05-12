import axios from "axios";
import { API_BASE_URL } from "../config/config";
export const user = {
  login: (data) => axios.post(`${API_BASE_URL}/login/`, data),
  signup: (data) => axios.post(`${API_BASE_URL}/signup/`, data),
  verifyOtp: (data) => axios.post(`${API_BASE_URL}/verify/`, data),
  resendotp: () => axios.post(`${API_BASE_URL}/resend-otp`),
  recoverPassword: (data) =>
    axios.post(`${API_BASE_URL}/recover-password/`, data),
};
