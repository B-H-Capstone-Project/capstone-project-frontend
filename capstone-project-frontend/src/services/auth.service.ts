import axios from "../api/axios";

const register = () => {
  return axios.post('/auth/signup', {

  });
};

const signIn = (email: string, password: string) => {
  console.log(email, password);
  return axios
    .post('/auth/signin', {
      email,
      password
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("token", JSON.stringify(response.data.token));
      }

      return response.data;
    });
};

const signOut = () => {
  return localStorage.removeItem("token");
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  register,
  signIn,
  signOut,
};