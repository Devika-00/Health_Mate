import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { TOKEN_API } from "../constants";
import logout from "./logout";
import { Payload } from "../types/propsType";

const axiosJWT = axios.create();
axiosJWT.defaults.withCredentials = true;

const getAccessToken = async () => {
  try {
    const token = localStorage.getItem('access_token');
    if (!token) {
      // Handle case when token doesn't exist in local storage
      console.error('Access token not found in local storage');
      return null;
    }
    const headers = {
      Authorization: `Bearer ${token}`
    };
    const { data } = await axios.get(`${TOKEN_API}/accessToken`, { headers });
    
    const decodedToken: Payload = await jwtDecode(token);
    const { role } = decodedToken;
    if (role === "doctor" || role === "user") {
      const { user } = data;
      if (user && user.isBlocked) {
        logout("Your account has been blocked by the administrator", "error");
        return null;
      }
    }
    return token;
  } catch (error) {
    console.log(error, "Error in getting token");
    return null;
  }
};

axiosJWT.interceptors.request.use(async (config) => {
  try {
    const accessToken = await getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  } catch (error) {
    console.log("Error in adding token to request:", error);
  }
  return config;
});

export default axiosJWT;
