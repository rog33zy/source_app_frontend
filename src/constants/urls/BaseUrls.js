export const AUTHENTICATION_BASE_URL =
  process.env.NODE_ENV === "development"
    ? "https://50fb-41-174-44-34.ngrok.io/"
    : "https://authentication.goodnatureagro.com/";

export const DEFAULT_BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8001/"
    : "https://source.goodnatureagro.com/";
