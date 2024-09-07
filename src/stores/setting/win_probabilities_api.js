import { apiBase } from "@/config"; // Adjust this to your API base URL
import axios from 'axios';
import Cookies from 'js-cookie';

const token = Cookies.get('token');

const apiClient = axios.create({
  baseURL: apiBase,
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
});

const apiClientMultiple = axios.create({
  baseURL: apiBase,
  headers: {
    'Authorization': `Bearer ${token}`,
  },
});

export default {
  insertWinProbabilities(formdata) {
    return apiClientMultiple.post(`/win-probabilities`, formdata);
  },
  fetchWinProbabilitiesList(page) {
    return apiClient.get(`/all-win-probabilities-paginated?page=${page}`);
  },
  searchWinProbabilitiesList(search) {
    return apiClient.get(`/all-win-probabilities-paginated?search=${search}`);
  },
  showWinProbabilities(id) {
    return apiClientMultiple.get(`/win-probabilities/${id}`);
  },
  deleteWinProbabilities(id) {
    return apiClientMultiple.delete(`/win-probabilities/${id}`);
  },
  updateWinProbabilities(formdata, id) {
     console.log(JSON.stringify(formdata),JSON.parse(JSON.stringify(formdata)));
    return apiClientMultiple.put(`/win-probabilities/${id}`, JSON.parse(JSON.stringify(formdata)));
  }
};