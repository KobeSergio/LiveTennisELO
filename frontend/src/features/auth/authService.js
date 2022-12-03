//SERVICE IS FOR HTPP REQUEST
//SEND DATA BACK
//SEND DATA TO LOCAL STORAGE

import axios from "axios";

const port = process.env.PORT || 5000;
const LOGIN_URL = `/admin-login`; 
//const LOGIN_URL = `http://localhost:5000/admin-login`;

//Login user
const login = async (userData) => {
  const response = await axios.post(LOGIN_URL, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

//Logout service
const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  login,
  logout,
};

export default authService;
