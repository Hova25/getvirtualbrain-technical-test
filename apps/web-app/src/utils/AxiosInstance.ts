import axios from "axios";

import { BACKEND_URL } from "./ShortEnv";

export const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
});
