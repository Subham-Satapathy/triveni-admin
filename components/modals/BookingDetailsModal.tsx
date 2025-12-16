'use client';

import { Booking } from '@/types';
import { formatCurrency, formatDateTime, getStatusColor } from '@/lib/utils';
import { X, Calendar, MapPin, User, Mail, Phone, CreditCard, Car, MapPinned } from 'lucide-react';

interface BookingDetailsModalProps {
  booking: Booking;
  onClose: () => void;
  onStatusUpdate: (status: string) => void;
}

export default function BookingDetailsModal({ booking, onClose, onStatusUpdate }: BookingDetailsModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-xl sm:rounded-2xl w-full max-w-4xl my-4 sm:my-8 max-h-[95vh] flex flex-col">
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 flex-shrink-0">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Booking Details</h2>
            <p className="text-gray-500 mt-1">Booking ID: #{booking.id}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-y-auto flex-1">
          {/* Status Badge */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <span className={`badge text-lg px-4 py-2 ${getStatusColor(booking.status)}`}>
              {booking.status}
            </span>
            <div className="text-right">
              <div className="text-sm text-gray-500">Total Amount</div>
              <div className="text-3xl font-bold text-gray-900">
                {formatCurrency(booking.totalAmount)}
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <User className="w-5 h-5" />
              Customer Information
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-gray-400" />
                <span className="font-medium">{booking.customerName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">{booking.customerEmail}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">{booking.customerPhone}</span>
              </div>
              {booking.user && (
                <div className="pt-2 mt-2 border-t border-gray-200">
                  <span className="text-sm text-gray-500">User ID: {booking.user.id}</span>
                </div>
              )}
            </div>
          </div>

          {/* Booking Details */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Booking Details
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              {booking.vehicle && (
                <div>
                  <div className="text-sm text-gray-500 mb-1">Vehicle</div>
                  <div className="flex items-center gap-3">
                    {booking.vehicle.imageUrl && (
                      <img
                        src={booking.vehicle.imageUrl}
                        alt={booking.vehicle.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                    )}
                    <div>
                      <div className="font-semibold text-gray-900">{booking.vehicle.name}</div>
                      <div className="text-sm text-gray-600">
                        {booking.vehicle.brand} {booking.vehicle.model}
                      </div>
                      <div className="text-xs text-gray-500">
                        {booking.vehicle.type} • {booking.vehicle.seats} seats
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {booking.tour && (
                <div>
                  <div className="text-sm text-gray-500 mb-1">Tour Package</div>
                  <div className="flex items-center gap-3">
                    {booking.tour.imageUrl && (
                      <img
                        src={booking.tour.imageUrl}
                        alt={booking.tour.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                    )}
                    <div>
                      <div className="font-semibold text-gray-900">{booking.tour.name}</div>
                      <div className="text-sm text-gray-600">
                        {booking.tour.fromCity?.name} → {booking.tour.toCity?.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {booking.tour.durationDays} days • {booking.tour.distanceKm} km
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-200">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Start Date & Time</div>
                  <div className="font-medium text-gray-900">
                    {formatDateTime(booking.startDateTime)}
                  </div>
                </div>
                {booking.endDateTime && (
                  <div>
                    <div className="text-sm text-gray-500 mb-1">End Date & Time</div>
                    <div className="font-medium text-gray-900">
                      {formatDateTime(booking.endDateTime)}
                    </div>
                  </div>
                )}
              </div>

              {booking.pickupLocation && (
                <div>
                  <div className="text-sm text-gray-500 mb-1 flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    Pickup Location
                  </div>
                  <div className="text-gray-900">{booking.pickupLocation}</div>
                </div>
              )}

              {booking.dropoffLocation && (
                <div>
                  <div className="text-sm text-gray-500 mb-1 flex items-center gap-1">
                    <MapPinned className="w-4 h-4" />
                    Dropoff Location
                  </div>
                  <div className="text-gray-900">{booking.dropoffLocation}</div>
                </div>
              )}

              {booking.numberOfPeople && (
                <div>
                  <div className="text-sm text-gray-500 mb-1">Number of People</div>
                  <div className="font-medium text-gray-900">{booking.numberOfPeople}</div>
                </div>
              )}
            </div>
          </div>

          {/* Payment Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Payment Information
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Amount</span>
                <span className="font-semibold text-gray-900">
                  {formatCurrency(booking.totalAmount)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Status</span>
                <span className={`badge ${getStatusColor(booking.status)}`}>
                  {booking.status}
                </span>
              </div>
              {booking.paymentId && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment ID</span>
                  <span className="text-gray-900 font-mono text-sm">{booking.paymentId}</span>
                </div>
              )}
              <div className="flex justify-between pt-2 border-t border-gray-200">
                <span className="text-gray-600">Booked On</span>
                <span className="text-gray-900">
                  {formatDateTime(booking.createdAt || new Date().toISOString())}
                </span>
              </div>
            </div>
          </div>

          {/* Special Requests */}
          {booking.specialRequests && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Special Requests</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700">{booking.specialRequests}</p>
              </div>
            </div>
          )}

          {/* Update Status */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Update Status</h3>
            <div className="flex gap-2">
              <button
                onClick={() => onStatusUpdate('PENDING')}
                className={`flex-1 px-4 py-2.5 rounded-lg font-medium transition-colors ${
                  booking.status === 'PENDING'
                    ? 'bg-yellow-600 text-white'
                    : 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100'
                }`}
              >
                Pending
              </button>
              <button
                onClick={() => onStatusUpdate('PAID')}
                className={`flex-1 px-4 py-2.5 rounded-lg font-medium transition-colors ${
                  booking.status === 'PAID'
                    ? 'bg-green-600 text-white'
                    : 'bg-green-50 text-green-700 hover:bg-green-100'
                }`}
              >
                Paid
              </button>
              <button
                onClick={() => onStatusUpdate('CANCELLED')}
                className={`flex-1 px-4 py-2.5 rounded-lg font-medium transition-colors ${
                  booking.status === 'CANCELLED'
                    ? 'bg-red-600 text-white'
                    : 'bg-red-50 text-red-700 hover:bg-red-100'
                }`}
              >
                Cancelled
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6 border-t border-gray-200 flex-shrink-0 bg-gray-50">
          <button
            onClick={onClose}
            className="w-full px-4 py-2.5 sm:py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors text-sm sm:text-base"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
