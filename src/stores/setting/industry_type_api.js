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
  insertIndustryType(formdata) {
    return apiClientMultiple.post(`/industry-types`, formdata);
  },
  fetchIndustryTypeList(page) {
    return apiClient.get(`/all-industry-types-paginated?page=${page}`);
  },
  searchIndustryTypeList(search) {
    return apiClient.get(`/all-industry-types-paginated?search=${search}`);
  },
  showIndustryType(id) {
    return apiClientMultiple.get(`/industry-types/${id}`);
  },
  deleteIndustryType(id) {
    return apiClientMultiple.delete(`/industry-types/${id}`);
  },
  updateIndustryType(formdata, id) {
     console.log(JSON.stringify(formdata),JSON.parse(JSON.stringify(formdata)));
    return apiClientMultiple.put(`/industry-types/${id}`, JSON.parse(JSON.stringify(formdata)));
  }
};