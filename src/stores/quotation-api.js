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
  insertQuotation(formdata) {
    return apiClientMultiple.post(`/quotations`, formdata);
  },
  fetchQuotationList(page) {
    return apiClient.get(`/all-quotations-paginated?page=${page}`);
  },
  searchQuotationList(search) {
    return apiClient.get(`/all-quotations-paginated?search=${search}`);
  },
  showQuotation(id) {
    return apiClientMultiple.get(`/quotations/${id}`);
  },
  deleteQuotation(id) {
    return apiClientMultiple.delete(`/quotations/${id}`);
  },
  updateQuotation(formdata, id) {
     console.log(JSON.stringify(formdata),JSON.parse(JSON.stringify(formdata)));
    return apiClientMultiple.put(`/quotations/${id}`, JSON.parse(JSON.stringify(formdata)));
  }
};