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
  insertDesignation(formdata) {
    return apiClientMultiple.post(`/designations`, formdata);
  },
  fetchDesignationList(page) {
    return apiClient.get(`/all-designations-paginated?page=${page}`);
  },
  searchDesignationList(search) {
    return apiClient.get(`/all-designations-paginated?search=${search}`);
  },
  showDesignation(id) {
    return apiClientMultiple.get(`/designations/${id}`);
  },
  deleteDesignation(id) {
    return apiClientMultiple.delete(`/designations/${id}`);
  },
  updateDesignation(formdata, id) {
     console.log(JSON.stringify(formdata),JSON.parse(JSON.stringify(formdata)));
    return apiClientMultiple.put(`/designations/${id}`, JSON.parse(JSON.stringify(formdata)));
  }
};