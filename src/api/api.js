import axios from 'axios';
import { API_BASE_URL, API_KEY } from './apiParams';

export const api = axios.create({
  baseURL: API_BASE_URL,
});

export {API_BASE_URL, API_KEY}
