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
  updateLead(formdata, id) {
     console.log(JSON.stringify(formdata),JSON.parse(JSON.stringify(formdata)));
    return apiClientMultiple.put(`/lead/${id}`, JSON.parse(JSON.stringify(formdata)));
  }
};