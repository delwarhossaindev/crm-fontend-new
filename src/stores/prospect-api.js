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
  insertProspect(formdata) {
    return apiClientMultiple.post(`/individual-info`, formdata);
  },
  insertItemWiseProspect(formdata) {
    return apiClientMultiple.post(`/item-wise-individual-info`, formdata);
  },
  fetchProspectList(page) {
    return apiClient.get(`/all-individual-info-paginated?page=${page}`);
  },
  searchProspectList(search) {
    return apiClient.get(`/all-individual-info-paginated?search=${search}`);
  },
  showProspect(id) {
    return apiClientMultiple.get(`/individual-info/${id}`);
  },
  deleteProspect(id) {
    return apiClientMultiple.delete(`/individual-info/${id}`);
  },
  updateProspect(formdata, id) {
     console.log(JSON.stringify(formdata),JSON.parse(JSON.stringify(formdata)));
    return apiClientMultiple.put(`/individual-info/${id}`, JSON.parse(JSON.stringify(formdata)));
  }
};