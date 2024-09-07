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
  insertJobType(formdata) {
    return apiClientMultiple.post(`/job-types`, formdata);
  },
  fetchJobTypeList(page) {
    return apiClient.get(`/all-job-types-paginated?page=${page}`);
  },
  searchJobTypeList(search) {
    return apiClient.get(`/all-job-types-paginated?search=${search}`);
  },
  showJobType(id) {
    return apiClientMultiple.get(`/job-types/${id}`);
  },
  deleteJobType(id) {
    return apiClientMultiple.delete(`/job-types/${id}`);
  },
  updateJobType(formdata, id) {
     console.log(JSON.stringify(formdata),JSON.parse(JSON.stringify(formdata)));
    return apiClientMultiple.put(`/job-types/${id}`, JSON.parse(JSON.stringify(formdata)));
  }
};