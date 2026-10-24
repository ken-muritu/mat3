/**
 * Ma3 API Service
 * Handles all API calls with offline support and error handling
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS, API } from '@ma3/shared';

const BASE_URL = API.BASE_URL;

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: any;
  headers?: Record<string, string>;
  requiresAuth?: boolean;
}

class ApiService {
  private token: string | null = null;

  async init() {
    this.token = await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  }

  async setToken(token: string) {
    this.token = token;
    await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
  }

  async clearToken() {
    this.token = null;
    await AsyncStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  }

  async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { method = 'GET', body, headers = {}, requiresAuth = true } = options;

    const requestHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      ...headers,
    };

    if (requiresAuth && this.token) {
      requestHeaders['Authorization'] = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method,
        headers: requestHeaders,
        body: body ? JSON.stringify(body) : undefined,
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || `HTTP ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Auth endpoints
  auth = {
    login: (phone: string, password: string) =>
      this.request('/auth/login', {
        method: 'POST',
        body: { phone, password },
        requiresAuth: false,
      }),

    register: (data: { firstName: string; lastName: string; phone: string; password: string }) =>
      this.request('/auth/register', {
        method: 'POST',
        body: data,
        requiresAuth: false,
      }),

    verifyOTP: (phone: string, otp: string) =>
      this.request('/auth/verify-otp', {
        method: 'POST',
        body: { phone, otp },
        requiresAuth: false,
      }),

    logout: () => this.clearToken(),
  };

  // Routes endpoints
  routes = {
    getAll: () => this.request('/routes'),
    getById: (id: string) => this.request(`/routes/${id}`),
    search: (query: string) => this.request(`/routes/search?q=${encodeURIComponent(query)}`),
  };

  // Bookings endpoints
  bookings = {
    create: (data: any) => this.request('/bookings', { method: 'POST', body: data }),
    getHistory: () => this.request('/bookings/history'),
    getById: (id: string) => this.request(`/bookings/${id}`),
    cancel: (id: string) => this.request(`/bookings/${id}/cancel`, { method: 'POST' }),
  };

  // Wallet endpoints
  wallet = {
    getBalance: () => this.request('/wallet/balance'),
    topUp: (amount: number, method: string) =>
      this.request('/wallet/topup', { method: 'POST', body: { amount, method } }),
    getTransactions: () => this.request('/wallet/transactions'),
  };

  // Tracking endpoints
  tracking = {
    getVehicle: (vehicleId: string) => this.request(`/tracking/vehicle/${vehicleId}`),
    subscribe: (bookingId: string) => this.request(`/tracking/subscribe/${bookingId}`),
  };

  // Emergency endpoints
  emergency = {
    triggerSOS: (location: { lat: number; lng: number }) =>
      this.request('/emergency/sos', { method: 'POST', body: { location } }),
    getContacts: () => this.request('/emergency/contacts'),
    addContact: (contact: { name: string; phone: string; relationship: string }) =>
      this.request('/emergency/contacts', { method: 'POST', body: contact }),
  };
}

export const api = new ApiService();
export default api;
