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
  insertItem(formdata) {
    return apiClientMultiple.post(`/items`, formdata);
  },
  fetchItemList(page) {
    return apiClient.get(`/all-items-paginated?page=${page}`);
  },
  searchItemList(search) {
    return apiClient.get(`/all-items-paginated?search=${search}`);
  },
  showItem(id) {
    return apiClientMultiple.get(`/items/${id}`);
  },
  deleteItem(id) {
    return apiClientMultiple.delete(`/items/${id}`);
  },
  updateItem(formdata, id) {
     console.log(JSON.stringify(formdata),JSON.parse(JSON.stringify(formdata)));
    return apiClientMultiple.put(`/items/${id}`, JSON.parse(JSON.stringify(formdata)));
  }
};