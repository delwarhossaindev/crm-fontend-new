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
  insertGender(formdata) {
    return apiClientMultiple.post(`/genders`, formdata);
  },
  fetchGenderList(page) {
    return apiClient.get(`/all-genders-paginated?page=${page}`);
  },
  searchGenderList(search) {
    return apiClient.get(`/all-genders-paginated?search=${search}`);
  },
  showGender(id) {
    return apiClientMultiple.get(`/genders/${id}`);
  },
  deleteGender(id) {
    return apiClientMultiple.delete(`/genders/${id}`);
  },
  updateGender(formdata, id) {
     console.log(JSON.stringify(formdata),JSON.parse(JSON.stringify(formdata)));
    return apiClientMultiple.put(`/genders/${id}`, JSON.parse(JSON.stringify(formdata)));
  }
};