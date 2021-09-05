import axios from "axios";

import { DEFAULT_BASE_URL } from "./constants/urls/BaseUrls";

const instance = axios.create({
  baseURL: DEFAULT_BASE_URL,
});
export default instance;
