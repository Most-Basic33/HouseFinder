import axios from "axios";

export default axios.create({
//  baseURL: "http://localhost:6969/api",
baseURL:"http://64.227.104.65:6969/api",
  headers: {
    "Content-type": "application/json"
  },
withCredentials: true
});
