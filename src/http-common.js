import axios from "axios";

console.log(process.env)

export default axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:6969/api',
  headers: {
    "Content-type": "application/json"
  },
  withCredentials: true
});
