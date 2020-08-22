import api from "../services/api";
const endpoint = "top-headlines";

export const getTopHeadlines = (payload) => {
  return api.get(`${endpoint}?${payload}`);
};
