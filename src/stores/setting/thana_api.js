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
  insertThana(formdata) {
    return apiClientMultiple.post(`/thanas`, formdata);
  },
  fetchThanaList(page) {
    return apiClient.get(`/all-thanas-paginated?page=${page}`);
  },
  searchThanaList(search) {
    return apiClient.get(`/all-thanas-paginated?search=${search}`);
  },
  showThana(id) {
    return apiClientMultiple.get(`/thanas/${id}`);
  },
  deleteThana(id) {
    return apiClientMultiple.delete(`/thanas/${id}`);
  },
  updateThana(formdata, id) {
     console.log(JSON.stringify(formdata),JSON.parse(JSON.stringify(formdata)));
    return apiClientMultiple.put(`/thanas/${id}`, JSON.parse(JSON.stringify(formdata)));
  }
};