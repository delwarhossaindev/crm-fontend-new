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
  insertBusinessIndustry(formdata) {
    return apiClientMultiple.post(`/business-industries`, formdata);
  },
  fetchBusinessIndustryList(page) {
    return apiClient.get(`/all-business-industries-paginated?page=${page}`);
  },
  searchBusinessIndustryList(search) {
    return apiClient.get(`/all-business-industries-paginated?search=${search}`);
  },
  showBusinessIndustry(id) {
    return apiClientMultiple.get(`/business-industries/${id}`);
  },
  deleteBusinessIndustry(id) {
    return apiClientMultiple.delete(`/business-industries/${id}`);
  },
  updateBusinessIndustry(formdata, id) {
     console.log(JSON.stringify(formdata),JSON.parse(JSON.stringify(formdata)));
    return apiClientMultiple.put(`/business-industries/${id}`, JSON.parse(JSON.stringify(formdata)));
  }
};