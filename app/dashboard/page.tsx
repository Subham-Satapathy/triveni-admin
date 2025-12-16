'use client';

import { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api-client';
import { DashboardStats } from '@/types';
import { formatCurrency, formatNumber, formatDateTime, getStatusColor } from '@/lib/utils';
import {
  TrendingUp,
  Car,
  Calendar,
  Users,
  DollarSign,
  Clock,
} from 'lucide-react';

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const data = await apiClient.getDashboardStats();
      console.log('Dashboard Stats:', data);
      if (data.recentBookings && data.recentBookings.length > 0) {
        console.log('First booking:', data.recentBookings[0]);
        console.log('Vehicle in booking:', data.recentBookings[0].vehicle);
      }
      setStats(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load dashboard stats');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <h3 className="text-red-800 font-semibold mb-2">Error Loading Dashboard</h3>
        <p className="text-red-700">{error}</p>
        <p className="text-sm text-red-600 mt-2">
          Make sure your backend API is running and the API URL is configured correctly.
        </p>
      </div>
    );
  }

  const statCards = [
    {
      name: 'Total Revenue',
      value: formatCurrency(stats?.totalRevenue || 0),
      icon: DollarSign,
      color: 'bg-green-500',
    },
    {
      name: 'Total Bookings',
      value: formatNumber(stats?.totalBookings || 0),
      icon: Calendar,
      color: 'bg-blue-500',
    },
    {
      name: 'Active Vehicles',
      value: formatNumber(stats?.totalVehicles || 0),
      icon: Car,
      color: 'bg-purple-500',
    },
    {
      name: 'Total Users',
      value: formatNumber(stats?.totalUsers || 0),
      icon: Users,
      color: 'bg-orange-500',
    },
    {
      name: 'Active Bookings',
      value: formatNumber(stats?.activeBookings || 0),
      icon: TrendingUp,
      color: 'bg-cyan-500',
    },
    {
      name: 'Pending Bookings',
      value: formatNumber(stats?.pendingBookings || 0),
      icon: Clock,
      color: 'bg-yellow-500',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome back! Here's your overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="card hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-4 rounded-2xl shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Bookings */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Bookings</h2>
        <div className="overflow-x-auto -mx-6 sm:mx-0 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-100">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Vehicle
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {stats?.recentBookings && stats.recentBookings.length > 0 ? (
                stats.recentBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-semibold text-gray-900">
                          {booking.customerName}
                        </div>
                        <div className="text-sm text-gray-500">{booking.customerEmail}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {booking.vehicleName || 
                       booking.vehicle?.name || 
                       (booking.vehicle?.brand && booking.vehicle?.model ? `${booking.vehicle.brand} ${booking.vehicle.model}` : null) ||
                       `Vehicle #${booking.vehicleId}`}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDateTime(booking.startDateTime)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      {formatCurrency(booking.totalAmount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`badge ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    No recent bookings found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
