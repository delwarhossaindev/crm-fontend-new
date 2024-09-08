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
  insertProfession(formdata) {
    return apiClientMultiple.post(`/professions`, formdata);
  },
  fetchProfessionList(page) {
    return apiClient.get(`/all-professions-paginated?page=${page}`);
  },
  searchProfessionList(search) {
    return apiClient.get(`/all-professions-paginated?search=${search}`);
  },
  showProfession(id) {
    return apiClientMultiple.get(`/professions/${id}`);
  },
  deleteProfession(id) {
    return apiClientMultiple.delete(`/professions/${id}`);
  },
  updateProfession(formdata, id) {
     console.log(JSON.stringify(formdata),JSON.parse(JSON.stringify(formdata)));
    return apiClientMultiple.put(`/professions/${id}`, JSON.parse(JSON.stringify(formdata)));
  }
};