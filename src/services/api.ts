// json-server --host 192.168.100.12 --port 3333 --watch server.json
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.100.8:3333',
});

export default api;