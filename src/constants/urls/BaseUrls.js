export const AUTHENTICATION_BASE_URL =
  process.env.NODE_ENV === "development"
    ? "https://authentication.goodnatureagro.com/"
    : "https://authentication.goodnatureagro.com/";

export const DEFAULT_BASE_URL =
  process.env.NODE_ENV === "development"
    ? "https://source.goodnatureagro.com/"
    : "https://source.goodnatureagro.com/";
