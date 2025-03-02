import axios from "axios";

export const paymentApi = axios.create({
  baseURL: `https://api.lemonsqueezy.com/v1`,
  headers: {
    accept: "application/vnd.api+json",
    "Content-Type": "application/vnd.api+json",
    authorization: `Bearer ${process.env.LEMON_SQUEEZY_API_KEY}`,
  },
});
