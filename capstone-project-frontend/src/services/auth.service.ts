import axios from "../api/axios";

const register = () => {
  return axios.post('/auth/signup', {

  });
};

const login = () => {
  return axios
    .post('/auth/signup', {
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("token");
};

export default {
  register,
  login,
  logout,
};