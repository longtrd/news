import axios from "axios";

const instance = axios.create({
  baseURL: "https://newsapi.org/v2/",
});

instance.interceptors.request.use(
  (config) => {
    config.params = { apiKey: "3fc12ff70e0e4cd6940b5835ed8583f0" };
    return config;
  },
  (err) => err
);

instance.interceptors.response.use(
  (res) => res,
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
