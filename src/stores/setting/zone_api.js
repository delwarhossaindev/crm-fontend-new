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
  insertZone(formdata) {
    return apiClientMultiple.post(`/zones`, formdata);
  },
  fetchZoneList(page) {
    return apiClient.get(`/all-zones-paginated?page=${page}`);
  },
  searchZoneList(search) {
    return apiClient.get(`/all-zones-paginated?search=${search}`);
  },
  showZone(id) {
    return apiClientMultiple.get(`/zones/${id}`);
  },
  deleteZone(id) {
    return apiClientMultiple.delete(`/zones/${id}`);
  },
  updateZone(formdata, id) {
     console.log(JSON.stringify(formdata),JSON.parse(JSON.stringify(formdata)));
    return apiClientMultiple.put(`/zones/${id}`, JSON.parse(JSON.stringify(formdata)));
  }
};