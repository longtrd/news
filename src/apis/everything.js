import api from "../services/api";
const endpoint = "everything";

export const getEverything = (payload) => {
  return api.get(`${endpoint}?${payload}`);
};
