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
  insertOrder(formdata) {
    return apiClientMultiple.post(`/sales-order`, formdata);
  },
  fetchOrderList(page) {
    return apiClient.get(`/all-sales-order-paginated?page=${page}`);
  },
  searchOrderList(search) {
    return apiClient.get(`/all-sales-order-paginated?search=${search}`);
  },
  showOrder(id) {
    return apiClientMultiple.get(`/sales-order/${id}`);
  },
  deleteOrder(id) {
    return apiClientMultiple.delete(`/sales-order/${id}`);
  },
  updateOrder(formdata, id) {
     console.log(JSON.stringify(formdata),JSON.parse(JSON.stringify(formdata)));
    return apiClientMultiple.put(`/sales-order/${id}`, JSON.parse(JSON.stringify(formdata)));
  }
};