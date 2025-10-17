import 'dotenv/config';

const BASE_URL = process.env.API_BASE_URL;
const API_KEY = process.env.API_KEY;

export async function apiRequest(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;

  const defaultHeaders = {
    'Content-Type': 'application/json',
    'x-api-key': API_KEY,
  };

  const config = {
    ...options,
    headers: { ...defaultHeaders, ...options.headers },
  };

  const response = await fetch(url, config);

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }

  return response.json();
}

export async function fetchWithRetry(fetchFn, args = [], retries = 3, delay = 1000) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await fetchFn(...args)
    } catch (err) {
      console.warn(`Tried ${attempt} failed: ${err.message}`)
      if (attempt === retries) throw err
      await new Promise(res => setTimeout(res, delay))
    }
  }
}
