// src/stores/item_api.js
import { apiBase } from "@/config";
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

export default {
  fetchItemList(page = 1, perPage = 10, query = '', sortBy = '', orderBy = '') {
    const params = {
      page,
      per_page: perPage,
    };

    if (query) params.q = query;
    if (sortBy && orderBy) {
      params.sortBy = sortBy;
      params.orderBy = orderBy;
    }

    return apiClient.get('/items', { params });
  },
};
