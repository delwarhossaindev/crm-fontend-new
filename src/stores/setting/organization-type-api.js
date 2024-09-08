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
  insertOrganizationType(formdata) {
    return apiClientMultiple.post(`/organization-types`, formdata);
  },
  fetchOrganizationTypeList(page) {
    return apiClient.get(`/all-organization-types-paginated?page=${page}`);
  },
  searchOrganizationTypeList(search) {
    return apiClient.get(`/all-organization-types-paginated?search=${search}`);
  },
  showOrganizationType(id) {
    return apiClientMultiple.get(`/organization-types/${id}`);
  },
  deleteOrganizationType(id) {
    return apiClientMultiple.delete(`/organization-types/${id}`);
  },
  updateOrganizationType(formdata, id) {
     console.log(JSON.stringify(formdata),JSON.parse(JSON.stringify(formdata)));
    return apiClientMultiple.put(`/organization-types/${id}`, JSON.parse(JSON.stringify(formdata)));
  }
};