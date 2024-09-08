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
  insertDivision(formdata) {
    return apiClientMultiple.post(`/divisions`, formdata);
  },
  fetchDivisionList(page) {
    return apiClient.get(`/all-divisions-paginated?page=${page}`);
  },
  searchDivisionList(search) {
    return apiClient.get(`/all-divisions-paginated?search=${search}`);
  },
  showDivision(id) {
    return apiClientMultiple.get(`/divisions/${id}`);
  },
  deleteDivision(id) {
    return apiClientMultiple.delete(`/divisions/${id}`);
  },
  updateDivision(formdata, id) {
     console.log(JSON.stringify(formdata),JSON.parse(JSON.stringify(formdata)));
    return apiClientMultiple.put(`/divisions/${id}`, JSON.parse(JSON.stringify(formdata)));
  }
};