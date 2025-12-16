'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { apiClient } from '@/lib/api-client';
import { Vehicle } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { Plus, Edit, Trash2, Eye, Car, MapPin } from 'lucide-react';
import VehicleForm from '@/components/forms/VehicleForm';
import VehicleDetailsModal from '@/components/modals/VehicleDetailsModal';

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [viewingVehicle, setViewingVehicle] = useState<Vehicle | null>(null);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const data = await apiClient.getVehicles();
      setVehicles(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load vehicles');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this vehicle?')) return;

    try {
      await apiClient.deleteVehicle(id);
      setVehicles(vehicles.filter((v) => v.id !== id));
    } catch (err: any) {
      alert(err.message || 'Failed to delete vehicle');
    }
  };

  const handleEdit = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingVehicle(null);
    fetchVehicles();
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingVehicle(null);
  };

  const handleView = (vehicle: Vehicle) => {
    setViewingVehicle(vehicle);
  };

  const handleViewEdit = () => {
    setEditingVehicle(viewingVehicle);
    setViewingVehicle(null);
    setShowForm(true);
  };

  if (loading) {
    return <div className="text-center py-12">Loading vehicles...</div>;
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Vehicles</h1>
          <p className="text-gray-500 mt-1">Manage your vehicle fleet</p>
        </div>
        <button 
          onClick={() => setShowForm(true)}
          className="bg-black text-white px-4 py-2.5 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Vehicle
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:gap-6">
        {vehicles.length > 0 ? (
          vehicles.map((vehicle) => (
            <div key={vehicle.id} className="bg-white rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="flex flex-col sm:flex-row">
                {/* Vehicle Image */}
                <div className="sm:w-64 h-48 sm:h-auto bg-gradient-to-br from-gray-100 to-gray-50 flex-shrink-0">
                  {vehicle.imageUrl ? (
                    <img
                      src={vehicle.imageUrl}
                      alt={vehicle.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Car className="w-16 h-16 text-gray-300" />
                    </div>
                  )}
                </div>

                {/* Vehicle Info */}
                <div className="flex-1 p-5 sm:p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    {/* Left Section - Vehicle Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xl font-bold text-gray-900 truncate">{vehicle.name}</h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {vehicle.brand} {vehicle.model}
                          </p>
                        </div>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold flex-shrink-0 ${
                          vehicle.type === 'CAR' 
                            ? 'bg-blue-100 text-blue-700' 
                            : 'bg-purple-100 text-purple-700'
                        }`}>
                          {vehicle.type}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span>{vehicle.fromCity?.name} → {vehicle.toCity?.name}</span>
                        </div>
                        {vehicle.seats && (
                          <div className="flex items-center gap-1.5">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <span>{vehicle.seats} seats</span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold ${
                          vehicle.isActive
                            ? 'bg-green-50 text-green-700 border border-green-200'
                            : 'bg-gray-100 text-gray-600 border border-gray-200'
                        }`}>
                          {vehicle.isActive ? '● Active' : '○ Inactive'}
                        </span>
                        {vehicle.isFeatured && (
                          <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold bg-yellow-50 text-yellow-700 border border-yellow-200">
                            ★ Featured
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Right Section - Pricing & Actions */}
                    <div className="flex flex-col sm:flex-row lg:flex-col gap-4 lg:items-end">
                      <div className="text-right flex-shrink-0">
                        <div className="text-2xl font-bold text-gray-900">
                          {formatCurrency(vehicle.ratePerDay)}
                          <span className="text-sm font-normal text-gray-500">/day</span>
                        </div>
                        <div className="text-sm text-gray-600 mt-0.5">
                          {formatCurrency(vehicle.ratePerHour)}/hr
                        </div>
                      </div>

                      <div className="flex gap-2 flex-shrink-0">
                        <button
                          onClick={() => handleView(vehicle)}
                          className="p-2.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-gray-200 hover:border-blue-200"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleEdit(vehicle)}
                          className="p-2.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-gray-200 hover:border-blue-200"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(vehicle.id)}
                          className="p-2.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-gray-200 hover:border-red-200"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
            <Car className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No vehicles found</h3>
            <p className="text-gray-500 mb-6">Add your first vehicle to get started</p>
            <button 
              onClick={() => setShowForm(true)}
              className="bg-black text-white px-6 py-2.5 rounded-lg font-medium hover:bg-gray-800 transition-colors inline-flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Vehicle
            </button>
          </div>
        )}
      </div>

      {showForm && (
        <VehicleForm
          vehicle={editingVehicle || undefined}
          onSuccess={handleFormSuccess}
          onCancel={handleFormCancel}
        />
      )}

      {viewingVehicle && (
        <VehicleDetailsModal
          vehicle={viewingVehicle}
          onClose={() => setViewingVehicle(null)}
          onEdit={handleViewEdit}
        />
      )}
    </div>
  );
}
