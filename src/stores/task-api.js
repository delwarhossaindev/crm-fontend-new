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
  insertTask(formdata) {
    return apiClientMultiple.post(`/task`, formdata);
  },
  fetchTaskList(page) {
    return apiClient.get(`/all-task-paginated?page=${page}`);
  },
  searchTaskList(search) {
    return apiClient.get(`/all-task-paginated?search=${search}`);
  },
  showTask(id) {
    return apiClientMultiple.get(`/task/${id}`);
  },
  deleteTask(id) {
    return apiClientMultiple.delete(`/task/${id}`);
  },
  updateTask(formdata,id) {
    return apiClientMultiple.post(`/task-update/${id}`, formdata);
  }
};