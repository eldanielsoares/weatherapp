import axios from 'axios';

const api = axios.create({
  baseURL: `https://api.hgbrasil.com/weather?key=XXXX`,
});

export default api;

