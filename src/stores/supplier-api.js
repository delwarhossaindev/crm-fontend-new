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
    'Content-Type': 'multipart/form-data',
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

  updateSupplier(formdata) {
    return apiClientMultiple.post(`/supplier-update`, formdata);
  },

  updateSupplierOld(formdata, id) {
   
    // Send the PUT request with combined text and file data
    return apiClientMultiple.put(`/supplier/${id}`, formdata, {
      headers: {
        'Content-Type': 'multipart/form-data', // Ensures FormData is handled correctly
      },
    })
    .then(response => {
      console.log('Supplier updated successfully:', response.data);
      return response.data;
    })
    .catch(error => {
      console.error('Error updating supplier:', error.response ? error.response.data : error.message);
      throw error;
    });
  }

};