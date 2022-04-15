import axios from 'axios';

const api = axios.create({
  baseURL: `https://api.hgbrasil.com/weather?key=XXXXZ`,
});

export default api;

