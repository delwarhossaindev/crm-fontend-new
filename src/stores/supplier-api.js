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

  updateSupplier(formdata, id) {
    console.log('Updating supplier with ID:', id);
  
    // Extract text-based fields from formdata
    const params = new URLSearchParams();
    formdata.forEach((value, key) => {
      if (!(value instanceof File)) { // Exclude files from URL parameters
        params.append(key, value);
      }
    });
  
    // Create a new FormData object for the file
    const fileFormData = new FormData();
    if (formdata.get('attachment')) {
      fileFormData.append('attachment', formdata.get('attachment'));
    }
  
    // Send the PUT request, with text data as URL parameters and file in the body
    return apiClientMultiple.put(`/supplier/${id}`, fileFormData, {
      params: params,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data', // Ensure this for the FormData
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
  // updateSupplier(formdata, id) {
  //   console.log('Updating supplier with ID:', id);
  
  //   // Convert formdata into plain object or query params
  //   const params = new URLSearchParams();
  //   for (const [key, value] of formdata.entries()) {
  //     params.append(key, value);
  //   }
  
  //   return apiClientMultiple.put(`/supplier/${id}`, null, {
  //     params: params,
  //     headers: {
  //       'Authorization': `Bearer ${token}`,
  //       'Content-Type': 'multipart/form-data',
  //     },
  //   })
  //   .then(response => {
  //     console.log('Supplier updated successfully:', response.data);
  //     return response.data;
  //   })
  //   .catch(error => {
  //     console.error('Error updating supplier:', error.response ? error.response.data : error.message);
  //     throw error;
  //   });
  // }
};