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
  insertDepartment(formdata) {
    return apiClientMultiple.post(`/departments`, formdata);
  },
  fetchDepartmentList(page) {
    return apiClient.get(`/all-departments-paginated?page=${page}`);
  },
  searchDepartmentList(search) {
    return apiClient.get(`/all-departments-paginated?search=${search}`);
  },
  showDepartment(id) {
    return apiClientMultiple.get(`/departments/${id}`);
  },
  deleteDepartment(id) {
    return apiClientMultiple.delete(`/departments/${id}`);
  },
  updateDepartment(formdata, id) {
     console.log(JSON.stringify(formdata),JSON.parse(JSON.stringify(formdata)));
    return apiClientMultiple.put(`/departments/${id}`, JSON.parse(JSON.stringify(formdata)));
  }
};