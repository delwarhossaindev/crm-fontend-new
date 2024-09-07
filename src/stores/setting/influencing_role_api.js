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
  insertInfluencingRole(formdata) {
    return apiClientMultiple.post(`/influencing-roles`, formdata);
  },
  fetchInfluencingRoleList(page) {
    return apiClient.get(`/all-influencing-roles-paginated?page=${page}`);
  },
  searchInfluencingRoleList(search) {
    return apiClient.get(`/all-influencing-roles-paginated?search=${search}`);
  },
  showInfluencingRole(id) {
    return apiClientMultiple.get(`/influencing-roles/${id}`);
  },
  deleteInfluencingRole(id) {
    return apiClientMultiple.delete(`/influencing-roles/${id}`);
  },
  updateInfluencingRole(formdata, id) {
     console.log(JSON.stringify(formdata),JSON.parse(JSON.stringify(formdata)));
    return apiClientMultiple.put(`/influencing-roles/${id}`, JSON.parse(JSON.stringify(formdata)));
  }
};