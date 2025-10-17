import { apiRequest, fetchWithRetry } from './client.js';

export async function getPatients() {
  return apiRequest('/patients');
}

export async function getPatientsByPagination(page, limit) {
  const json = await fetchWithRetry(apiRequest, [`/patients?page=${page}&limit=${limit}`]);

  const data = json.data ?? [];
  const pagination = {
    hasNext: json.pagination?.hasNext ?? false,
    page: json.pagination?.page ?? page
  };

  return { data, pagination };
}