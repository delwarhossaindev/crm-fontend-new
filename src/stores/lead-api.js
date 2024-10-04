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

const apiClientMultipleUpdate = axios.create({
  baseURL: apiBase,
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'multipart/form-data'
  },
});

export default {
  insertLead(formdata) {
    return apiClientMultiple.post(`/lead`, formdata);
  },
  fetchLeadList(page) {
    return apiClient.get(`/all-lead-paginated?page=${page}`);
  },
  searchLeadList(search) {
    return apiClient.get(`/all-lead-paginated?search=${search}`);
  },
  showLead(id) {
    return apiClientMultiple.get(`/lead/${id}`);
  },
  deleteLead(id) {
    return apiClientMultiple.delete(`/lead/${id}`);
  },
  updateLead(id) {
    const formData = new FormData();
    formData.append('prospect_id', 1);
    formData.append('lead_name', 'lead_name');
    formData.append('_method', 'PUT');
    
    // No need to stringify FormData
    console.log(Object.fromEntries(formData)); // View form data in plain object form for debugging

    return apiClientMultiple.put(`/lead/${id}`, Object.fromEntries(formData), {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
},
  async updateLeadold(formdata1, id) {
    try {
      // Create FormData object and append form data
      const formData = new FormData();
      formData.append('prospect_id', 1);
      formData.append('lead_name', 'lead_name');

      const data = {
        prospect_id: 1,
        lead_name: 'lead_name',
      };
     
      
      // Make PUT/PATCH request using Axios
      const response = await axios.patch(`/lead/${id}`, {
        prospect_id: 1,
        lead_name: 'lead_name',
      }, {
        baseURL: apiBase,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      alert('Lead updated successfully!');
      console.log('Updated Lead:', response.data);
    } catch (error) {
      console.error('Error updating lead:', error);
    }
  }

};