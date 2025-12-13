import axios, { AxiosInstance, AxiosError } from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        // Add auth token if available
        const token = localStorage.getItem('admin_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          // Redirect to login on unauthorized
          if (typeof window !== 'undefined') {
            window.location.href = '/login';
          }
        }
        return Promise.reject(error);
      }
    );
  }

  // Dashboard
  async getDashboardStats() {
    const { data } = await this.client.get('/api/admin/stats');
    return data;
  }

  // Vehicles
  async getVehicles(params?: any) {
    const { data } = await this.client.get('/api/admin/vehicles', { params });
    return data;
  }

  async getVehicle(id: number) {
    const { data } = await this.client.get(`/api/admin/vehicles/${id}`);
    return data;
  }

  async createVehicle(vehicleData: any) {
    const { data } = await this.client.post('/api/admin/vehicles', vehicleData);
    return data;
  }

  async updateVehicle(id: number, vehicleData: any) {
    const { data } = await this.client.put(`/api/admin/vehicles/${id}`, vehicleData);
    return data;
  }

  async deleteVehicle(id: number) {
    const { data } = await this.client.delete(`/api/admin/vehicles/${id}`);
    return data;
  }

  // Tours
  async getTours(params?: any) {
    const { data } = await this.client.get('/api/admin/tours', { params });
    return data;
  }

  async getTour(id: number) {
    const { data } = await this.client.get(`/api/admin/tours/${id}`);
    return data;
  }

  async createTour(tourData: any) {
    const { data } = await this.client.post('/api/admin/tours', tourData);
    return data;
  }

  async updateTour(id: number, tourData: any) {
    const { data } = await this.client.put(`/api/admin/tours/${id}`, tourData);
    return data;
  }

  async deleteTour(id: number) {
    const { data } = await this.client.delete(`/api/admin/tours/${id}`);
    return data;
  }

  // Bookings
  async getBookings(params?: any) {
    const { data } = await this.client.get('/api/admin/bookings', { params });
    return data;
  }

  async getBooking(id: number) {
    const { data } = await this.client.get(`/api/admin/bookings/${id}`);
    return data;
  }

  async updateBookingStatus(id: number, status: string) {
    const { data } = await this.client.put(`/api/admin/bookings/${id}`, { status });
    return data;
  }

  // Users
  async getUsers(params?: any) {
    const { data } = await this.client.get('/api/admin/users', { params });
    return data;
  }

  async getUser(id: number) {
    const { data } = await this.client.get(`/api/admin/users/${id}`);
    return data;
  }

  async updateUser(id: number, userData: any) {
    const { data } = await this.client.put(`/api/admin/users/${id}`, userData);
    return data;
  }

  async deleteUser(id: number) {
    const { data } = await this.client.delete(`/api/admin/users/${id}`);
    return data;
  }

  // Cities
  async getCities() {
    const { data } = await this.client.get('/api/admin/cities');
    return data;
  }

  async createCity(cityData: any) {
    const { data } = await this.client.post('/api/admin/cities', cityData);
    return data;
  }

  async updateCity(id: number, cityData: any) {
    const { data } = await this.client.put(`/api/admin/cities/${id}`, cityData);
    return data;
  }

  async deleteCity(id: number) {
    const { data } = await this.client.delete(`/api/admin/cities/${id}`);
    return data;
  }
}

export const apiClient = new ApiClient();
