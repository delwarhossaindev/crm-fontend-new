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
  insertCountry(formdata) {
    return apiClientMultiple.post(`/countries`, formdata);
  },
  fetchCountryList(page) {
    return apiClient.get(`/all-countries-paginated?page=${page}`);
  },
  searchCountryList(search) {
    return apiClient.get(`/all-countries-paginated?search=${search}`);
  },
  showCountry(id) {
    return apiClientMultiple.get(`/countries/${id}`);
  },
  deleteCountry(id) {
    return apiClientMultiple.delete(`/countries/${id}`);
  },
  updateCountry(formdata, id) {
     console.log(JSON.stringify(formdata),JSON.parse(JSON.stringify(formdata)));
    return apiClientMultiple.put(`/countries/${id}`, JSON.parse(JSON.stringify(formdata)));
  }
};