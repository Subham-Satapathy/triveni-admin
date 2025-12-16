'use client';

import { Vehicle } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { X, Car, MapPin, DollarSign, Settings, Calendar, Star } from 'lucide-react';

interface VehicleDetailsModalProps {
  vehicle: Vehicle;
  onClose: () => void;
  onEdit: () => void;
}

export default function VehicleDetailsModal({ vehicle, onClose, onEdit }: VehicleDetailsModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-xl sm:rounded-2xl w-full max-w-4xl my-4 sm:my-8 max-h-[95vh] flex flex-col">
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 flex-shrink-0">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{vehicle.name}</h2>
            <p className="text-gray-500 mt-1">Vehicle Details</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-y-auto flex-1">
          {/* Vehicle Image */}
          {vehicle.imageUrl && (
            <div className="relative h-64 rounded-xl overflow-hidden bg-gray-100">
              <img
                src={vehicle.imageUrl}
                alt={vehicle.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Status Badges */}
          <div className="flex gap-3">
            <span
              className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold ${
                vehicle.isActive
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {vehicle.isActive ? '✓ Active' : '✕ Inactive'}
            </span>
            {vehicle.isFeatured && (
              <span className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold bg-yellow-100 text-yellow-800">
                <Star className="w-4 h-4 mr-1" />
                Featured
              </span>
            )}
            <span className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold ${
              vehicle.type === 'CAR' 
                ? 'bg-blue-100 text-blue-800' 
                : 'bg-purple-100 text-purple-800'
            }`}>
              {vehicle.type}
            </span>
          </div>

          {/* Vehicle Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Car className="w-5 h-5" />
              Vehicle Information
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Brand</div>
                  <div className="font-medium text-gray-900">{vehicle.brand}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Model</div>
                  <div className="font-medium text-gray-900">{vehicle.model}</div>
                </div>
                {vehicle.seats && (
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Seating Capacity</div>
                    <div className="font-medium text-gray-900">{vehicle.seats} seats</div>
                  </div>
                )}
                {vehicle.year && (
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Year</div>
                    <div className="font-medium text-gray-900">{vehicle.year}</div>
                  </div>
                )}
                {vehicle.color && (
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Color</div>
                    <div className="font-medium text-gray-900">{vehicle.color}</div>
                  </div>
                )}
                {vehicle.fuelType && (
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Fuel Type</div>
                    <div className="font-medium text-gray-900">{vehicle.fuelType}</div>
                  </div>
                )}
                {vehicle.transmissionType && (
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Transmission</div>
                    <div className="font-medium text-gray-900">{vehicle.transmissionType}</div>
                  </div>
                )}
                {vehicle.licensePlate && (
                  <div>
                    <div className="text-sm text-gray-500 mb-1">License Plate</div>
                    <div className="font-medium text-gray-900 font-mono">{vehicle.licensePlate}</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Route Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Route Information
            </h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="text-sm text-gray-500 mb-1">From</div>
                  <div className="font-semibold text-gray-900">{vehicle.fromCity?.name}</div>
                </div>
                <div className="px-4">
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
                <div className="flex-1 text-right">
                  <div className="text-sm text-gray-500 mb-1">To</div>
                  <div className="font-semibold text-gray-900">{vehicle.toCity?.name}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Pricing Information
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Rate Per Day</div>
                  <div className="text-2xl font-bold text-gray-900">{formatCurrency(vehicle.ratePerDay)}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Rate Per Hour</div>
                  <div className="text-2xl font-bold text-gray-900">{formatCurrency(vehicle.ratePerHour)}</div>
                </div>
                {vehicle.extraKmCharge && (
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Extra KM Charge</div>
                    <div className="font-medium text-gray-900">{formatCurrency(vehicle.extraKmCharge)}/km</div>
                  </div>
                )}
                {vehicle.includedKmPerDay && (
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Included KM Per Day</div>
                    <div className="font-medium text-gray-900">{vehicle.includedKmPerDay} km</div>
                  </div>
                )}
                {vehicle.securityDeposit && (
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Security Deposit</div>
                    <div className="font-medium text-gray-900">{formatCurrency(vehicle.securityDeposit)}</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          {vehicle.description && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700">{vehicle.description}</p>
              </div>
            </div>
          )}

          {/* Features */}
          {vehicle.features && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Features
              </h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex flex-wrap gap-2">
                  {vehicle.features.split(',').map((feature, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700"
                    >
                      {feature.trim()}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Statistics */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Statistics
            </h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Total Bookings</div>
                  <div className="text-2xl font-bold text-gray-900">{vehicle.totalBookings || 0}</div>
                </div>
                {vehicle.averageRating && (
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Average Rating</div>
                    <div className="text-2xl font-bold text-gray-900 flex items-center gap-1">
                      <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                      {vehicle.averageRating}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="p-4 sm:p-6 border-t border-gray-200 flex gap-3 flex-shrink-0 bg-gray-50">
          <button
            onClick={onEdit}
            className="flex-1 px-4 py-2.5 sm:py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors text-sm sm:text-base"
          >
            Edit Vehicle
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-white transition-colors text-sm sm:text-base"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
