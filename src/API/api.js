import axios from "axios";

const baseApi = axios.create({
  baseURL: "https://fakestoreapi.com",
});

export default baseApi;
