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
  insertAttendance(formdata) {
    return apiClientMultiple.post(`/attendance`, formdata);
  },
  fetchAttendanceList(page) {
    return apiClient.get(`/all-attendance-paginated?page=${page}`);
  },
  searchAttendanceList(search) {
    return apiClient.get(`/all-attendance-paginated?search=${search}`);
  },
  showAttendance(id) {
    return apiClientMultiple.get(`/attendance/${id}`);
  },
  deleteAttendance(id) {
    return apiClientMultiple.delete(`/attendance/${id}`);
  },
  updateAttendance(formdata, id) {
     console.log(JSON.stringify(formdata),JSON.parse(JSON.stringify(formdata)));
    return apiClientMultiple.put(`/attendance/${id}`, JSON.parse(JSON.stringify(formdata)));
  }
};