'use client';

import { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api-client';
import { Booking } from '@/types';
import { formatCurrency, formatDateTime, getStatusColor } from '@/lib/utils';
import { Calendar, Filter, Eye, User, Mail, Phone, MapPin, Car, Package, AlertCircle } from 'lucide-react';
import BookingDetailsModal from '@/components/modals/BookingDetailsModal';

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  useEffect(() => {
    fetchBookings();
  }, [filter]);

  const fetchBookings = async () => {
    try {
      const params = filter !== 'all' ? { status: filter } : {};
      const data = await apiClient.getBookings(params);
      setBookings(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id: number, status: string) => {
    try {
      await apiClient.updateBookingStatus(id, status);
      fetchBookings();
      setSelectedBooking(null);
    } catch (err: any) {
      alert(err.message || 'Failed to update status');
    }
  };

  if (loading) return <div className="text-center py-12">Loading bookings...</div>;

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Bookings</h1>
          <p className="text-gray-600 mt-1">Manage customer bookings</p>
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-500" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="input w-40"
          >
            <option value="all">All Bookings</option>
            <option value="PENDING">Pending</option>
            <option value="PAID">Paid</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <div key={booking.id} className="bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200">
              <div className="p-5">
                {/* Header Row */}
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-gray-900">#{booking.id}</span>
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Total Amount</p>
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(booking.totalAmount)}</p>
                  </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                  {/* Customer Info - 8 columns */}
                  <div className="lg:col-span-8 space-y-4">
                    {/* Customer Details Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                          <User className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-gray-900 truncate">{booking.customerName}</p>
                          <p className="text-xs text-gray-500">Customer</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-purple-50 flex items-center justify-center">
                          <Calendar className="w-4 h-4 text-purple-600" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-900 truncate">{formatDateTime(booking.startDateTime)}</p>
                          <p className="text-xs text-gray-500">Start Date</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center">
                          <Mail className="w-4 h-4 text-green-600" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm text-gray-900 truncate">{booking.customerEmail}</p>
                          <p className="text-xs text-gray-500">Email</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center">
                          <Phone className="w-4 h-4 text-orange-600" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm text-gray-900">{booking.customerPhone}</p>
                          <p className="text-xs text-gray-500">Phone</p>
                        </div>
                      </div>
                    </div>

                    {/* Vehicle/Tour Badge */}
                    {(booking.vehicle || booking.tour) ? (
                      <div className="flex items-center gap-3 px-3.5 py-2.5 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
                        {booking.vehicle ? (
                          <>
                            <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-blue-500 flex items-center justify-center">
                              <Car className="w-4 h-4 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-gray-900 truncate">{booking.vehicle.name}</p>
                            </div>
                            <span className="text-[10px] font-semibold text-blue-700 bg-blue-100 px-2.5 py-1 rounded-full uppercase tracking-wide flex-shrink-0">Vehicle</span>
                          </>
                        ) : (
                          <>
                            <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-purple-500 flex items-center justify-center">
                              <Package className="w-4 h-4 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-gray-900 truncate">{booking.tour!.name}</p>
                            </div>
                            <span className="text-[10px] font-semibold text-purple-700 bg-purple-100 px-2.5 py-1 rounded-full uppercase tracking-wide flex-shrink-0">Tour</span>
                          </>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center gap-3 px-3.5 py-2.5 bg-amber-50 rounded-lg border border-amber-200">
                        <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-amber-500 flex items-center justify-center">
                          <AlertCircle className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-amber-900">No item assigned</p>
                        </div>
                        <span className="text-[10px] font-semibold text-amber-700 bg-amber-100 px-2.5 py-1 rounded-full uppercase tracking-wide flex-shrink-0">Pending</span>
                      </div>
                    )}

                    {/* Locations if available */}
                    {(booking.pickupLocation || booking.dropoffLocation) && (
                      <div className="flex items-center gap-3 px-3.5 py-2.5 bg-gray-50 rounded-lg border border-gray-100">
                        <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <p className="text-sm text-gray-700 truncate flex-1">
                          <span className="font-medium">{booking.pickupLocation || 'N/A'}</span>
                          <span className="text-gray-400 mx-2">→</span>
                          <span className="font-medium">{booking.dropoffLocation || 'N/A'}</span>
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Actions Column - 4 columns */}
                  <div className="lg:col-span-4 flex flex-col gap-3">
                    <button
                      onClick={() => setSelectedBooking(booking)}
                      className="w-full px-4 py-3 text-sm font-semibold text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      View Details
                    </button>
                    
                    <select
                      value={booking.status}
                      onChange={(e) => handleStatusUpdate(booking.id, e.target.value)}
                      className="w-full px-4 py-3 text-sm font-medium border border-gray-300 rounded-lg bg-white hover:bg-gray-50 focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all cursor-pointer"
                    >
                      <option value="PENDING">Mark as Pending</option>
                      <option value="PAID">Mark as Paid</option>
                      <option value="CANCELLED">Mark as Cancelled</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No bookings found</h3>
            <p className="text-gray-500">
              {filter !== 'all' ? `No ${filter.toLowerCase()} bookings at the moment.` : 'Bookings will appear here once customers make reservations.'}
            </p>
          </div>
        )}
      </div>

      {selectedBooking && (
        <BookingDetailsModal
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
          onStatusUpdate={(status) => handleStatusUpdate(selectedBooking.id, status)}
        />
      )}
    </div>
  );
}
