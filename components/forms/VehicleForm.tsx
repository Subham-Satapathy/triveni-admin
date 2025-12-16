'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { apiClient } from '@/lib/api-client';
import { City, Vehicle } from '@/types';
import { X } from 'lucide-react';

const vehicleSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  type: z.enum(['CAR', 'BIKE'], { message: 'Vehicle type is required' }),
  brand: z.string().min(2, 'Brand is required'),
  model: z.string().min(2, 'Model is required'),
  seats: z.number().min(1, 'Seats must be at least 1').optional(),
  ratePerDay: z.number().min(0, 'Rate per day must be positive'),
  ratePerHour: z.number().min(0, 'Rate per hour must be positive').optional(),
  fromCityId: z.number({ message: 'From city is required' }),
  toCityId: z.number({ message: 'To city is required' }),
  imageUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  description: z.string().optional(),
  features: z.string().optional(),
  isActive: z.boolean(),
  isFeatured: z.boolean(),
});

type VehicleFormData = z.infer<typeof vehicleSchema>;

interface VehicleFormProps {
  vehicle?: Vehicle;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function VehicleForm({ vehicle, onSuccess, onCancel }: VehicleFormProps) {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VehicleFormData>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: vehicle ? {
      name: vehicle.name,
      type: vehicle.type,
      brand: vehicle.brand,
      model: vehicle.model,
      seats: vehicle.seats,
      ratePerDay: vehicle.ratePerDay,
      ratePerHour: vehicle.ratePerHour,
      fromCityId: vehicle.fromCity?.id,
      toCityId: vehicle.toCity?.id,
      imageUrl: vehicle.imageUrl || '',
      description: vehicle.description || '',
      features: vehicle.features || '',
      isActive: vehicle.isActive,
      isFeatured: vehicle.isFeatured,
    } : {
      isActive: true,
      isFeatured: false,
      brand: '',
      model: '',
      name: '',
      type: 'CAR' as const,
      ratePerDay: 0,
      fromCityId: 0,
      toCityId: 0,
    },
  });

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const data = await apiClient.getCities();
        setCities(data);
      } catch (err) {
        console.error('Failed to load cities:', err);
      }
    };
    fetchCities();
  }, []);

  const onSubmit = async (data: VehicleFormData) => {
    try {
      setLoading(true);
      if (vehicle) {
        await apiClient.updateVehicle(vehicle.id, data);
      } else {
        await apiClient.createVehicle(data);
      }
      onSuccess();
    } catch (err: any) {
      alert(err.response?.data?.message || err.message || 'Failed to save vehicle');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-xl sm:rounded-2xl w-full max-w-4xl my-4 sm:my-8 max-h-[95vh] flex flex-col">
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 flex-shrink-0">
          <h2 className="text-2xl font-bold text-gray-900">
            {vehicle ? 'Edit Vehicle' : 'Add New Vehicle'}
          </h2>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-1 min-h-0">
          <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-y-auto flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Vehicle Name */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vehicle Name *
              </label>
              <input
                type="text"
                {...register('name')}
                className="input w-full"
                placeholder="e.g., Toyota Innova Crysta"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vehicle Type *
              </label>
              <select {...register('type')} className="input w-full">
                <option value="">Select Type</option>
                <option value="CAR">Car</option>
                <option value="BIKE">Bike</option>
              </select>
              {errors.type && (
                <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>
              )}
            </div>

            {/* Brand */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Brand *
              </label>
              <input
                type="text"
                {...register('brand')}
                className="input w-full"
                placeholder="e.g., Toyota"
              />
              {errors.brand && (
                <p className="text-red-500 text-sm mt-1">{errors.brand.message}</p>
              )}
            </div>

            {/* Model */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Model *
              </label>
              <input
                type="text"
                {...register('model')}
                className="input w-full"
                placeholder="e.g., Innova Crysta"
              />
              {errors.model && (
                <p className="text-red-500 text-sm mt-1">{errors.model.message}</p>
              )}
            </div>

            {/* Seats */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Seats
              </label>
              <input
                type="number"
                {...register('seats', { valueAsNumber: true })}
                className="input w-full"
                placeholder="e.g., 7"
              />
              {errors.seats && (
                <p className="text-red-500 text-sm mt-1">{errors.seats.message}</p>
              )}
            </div>

            {/* Rate Per Day */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rate Per Day * (₹)
              </label>
              <input
                type="number"
                {...register('ratePerDay', { valueAsNumber: true })}
                className="input w-full"
                placeholder="e.g., 3000"
              />
              {errors.ratePerDay && (
                <p className="text-red-500 text-sm mt-1">{errors.ratePerDay.message}</p>
              )}
            </div>

            {/* Rate Per Hour */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rate Per Hour (₹)
              </label>
              <input
                type="number"
                {...register('ratePerHour', { valueAsNumber: true })}
                className="input w-full"
                placeholder="e.g., 300"
              />
              {errors.ratePerHour && (
                <p className="text-red-500 text-sm mt-1">{errors.ratePerHour.message}</p>
              )}
            </div>

            {/* From City */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                From City *
              </label>
              <select
                {...register('fromCityId', { valueAsNumber: true })}
                className="input w-full"
              >
                <option value="">Select City</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </select>
              {errors.fromCityId && (
                <p className="text-red-500 text-sm mt-1">{errors.fromCityId.message}</p>
              )}
            </div>

            {/* To City */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                To City *
              </label>
              <select
                {...register('toCityId', { valueAsNumber: true })}
                className="input w-full"
              >
                <option value="">Select City</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </select>
              {errors.toCityId && (
                <p className="text-red-500 text-sm mt-1">{errors.toCityId.message}</p>
              )}
            </div>

            {/* Image URL */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image URL
              </label>
              <input
                type="text"
                {...register('imageUrl')}
                className="input w-full"
                placeholder="https://example.com/vehicle.jpg"
              />
              {errors.imageUrl && (
                <p className="text-red-500 text-sm mt-1">{errors.imageUrl.message}</p>
              )}
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                {...register('description')}
                className="input w-full"
                rows={3}
                placeholder="Enter vehicle description..."
              />
            </div>

            {/* Features */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Features (comma-separated)
              </label>
              <textarea
                {...register('features')}
                className="input w-full"
                rows={2}
                placeholder="e.g., AC, Music System, GPS, Driver Included"
              />
            </div>

            {/* Status Toggles */}
            <div className="md:col-span-2 flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  {...register('isActive')}
                  className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
                />
                <span className="text-sm font-medium text-gray-700">Active</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  {...register('isFeatured')}
                  className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
                />
                <span className="text-sm font-medium text-gray-700">Featured</span>
              </label>
            </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 p-4 sm:p-6 pt-4 border-t border-gray-200 flex-shrink-0 bg-gray-50">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-white transition-colors text-sm sm:text-base"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 sm:py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 text-sm sm:text-base"
              disabled={loading}
            >
              {loading ? 'Saving...' : vehicle ? 'Update Vehicle' : 'Create Vehicle'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
