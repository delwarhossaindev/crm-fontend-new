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
  insertDistrict(formdata) {
    return apiClientMultiple.post(`/districts`, formdata);
  },
  fetchDistrictList(page) {
    return apiClient.get(`/all-districts-paginated?page=${page}`);
  },
  searchDistrictList(search) {
    return apiClient.get(`/all-districts-paginated?search=${search}`);
  },
  showDistrict(id) {
    return apiClientMultiple.get(`/districts/${id}`);
  },
  deleteDistrict(id) {
    return apiClientMultiple.delete(`/districts/${id}`);
  },
  updateDistrict(formdata, id) {
     console.log(JSON.stringify(formdata),JSON.parse(JSON.stringify(formdata)));
    return apiClientMultiple.put(`/districts/${id}`, JSON.parse(JSON.stringify(formdata)));
  }
};