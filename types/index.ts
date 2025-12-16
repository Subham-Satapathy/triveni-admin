// Types for the admin panel
export interface City {
  id: number;
  name: string;
  slug: string;
}

export interface Vehicle {
  id: number;
  name: string;
  type: 'CAR' | 'BIKE';
  brand?: string;
  model?: string;
  year?: number;
  color?: string;
  licensePlate?: string;
  seats?: number;
  seatingCapacity?: number;
  mileage?: string;
  fuelType?: 'PETROL' | 'DIESEL' | 'ELECTRIC' | 'HYBRID' | 'CNG';
  transmissionType?: 'MANUAL' | 'AUTOMATIC';
  features?: string;
  fromCityId: number;
  toCityId: number;
  ratePerHour: number;
  ratePerDay: number;
  extraKmCharge?: number;
  includedKmPerDay?: number;
  securityDeposit?: number;
  description?: string;
  imageUrl?: string;
  galleryImages?: string;
  isActive: boolean;
  isFeatured: boolean;
  totalBookings: number;
  averageRating?: string;
  createdAt: string;
  updatedAt: string;
  fromCity?: City;
  toCity?: City;
}

export interface Tour {
  id: number;
  name: string;
  slug: string;
  description?: string;
  fromCityId: number;
  toCityId: number;
  distanceKm: number;
  durationDays: number;
  basePrice: number;
  pricePerKm: number;
  maxGroupSize?: number;
  highlights?: string;
  itinerary?: string;
  inclusions?: string;
  exclusions?: string;
  imageUrl?: string;
  galleryImages?: string;
  isActive: boolean;
  isFeatured: boolean;
  totalBookings: number;
  averageRating?: string;
  createdAt: string;
  updatedAt: string;
  fromCity?: City;
  toCity?: City;
}

export interface Booking {
  id: number;
  vehicleId: number;
  vehicleName?: string;
  tourId?: number;
  fromCityId: number;
  toCityId: number;
  startDateTime: string;
  endDateTime: string;
  tripDurationHours: number;
  pricePerHour: number;
  pricePerDay: number;
  totalAmount: number;
  securityDeposit?: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  pickupLocation?: string;
  dropoffLocation?: string;
  numberOfPeople?: number;
  specialRequests?: string;
  paymentId?: string;
  status: 'PENDING' | 'PAID' | 'CANCELLED';
  paymentReference?: string;
  createdAt: string;
  updatedAt: string;
  vehicle?: Vehicle;
  tour?: Tour;
  user?: User;
  fromCity?: City;
  toCity?: City;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardStats {
  totalBookings: number;
  totalRevenue: number;
  totalVehicles: number;
  totalUsers: number;
  activeBookings: number;
  pendingBookings: number;
  totalTours: number;
  recentBookings: Booking[];
  monthlyRevenue: {
    month: string;
    revenue: number;
  }[];
  bookingsByStatus: {
    status: string;
    count: number;
  }[];
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
