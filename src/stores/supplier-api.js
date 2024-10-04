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
  insertSupplier(formdata) {
    return apiClientMultiple.post(`/supplier`, formdata);
  },
  fetchSupplierList(page) {
    return apiClient.get(`/all-supplier-paginated?page=${page}`);
  },
  searchSupplierList(search) {
    return apiClient.get(`/all-supplier-paginated?search=${search}`);
  },
  showSupplier(id) {
    return apiClientMultiple.get(`/supplier/${id}`);
  },
  deleteSupplier(id) {
    return apiClientMultiple.delete(`/supplier/${id}`);
  },
  updateSupplier(formdata, id) {
   
    return apiClientMultiple.patch(`/supplier/${id}`, formdata);
  }
};