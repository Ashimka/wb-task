import axios from "axios";

const WILDBERRIES_API_URL = "https://feedbacks-api.wildberries.ru";
const API_KEY = process.env.WILDBERRIES_API_KEY;

export const wbApi = axios.create({
  baseURL: WILDBERRIES_API_URL,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});
