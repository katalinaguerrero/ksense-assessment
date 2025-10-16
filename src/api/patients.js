import { apiRequest } from './client.js';

export async function getPatients() {
  return apiRequest('/patients');
}

export async function getPatientsByPagination(page, limit) {
  return apiRequest(`/patients?page=${page}&limit=${limit}`);
}
