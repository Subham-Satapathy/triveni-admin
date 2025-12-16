'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { apiClient } from '@/lib/api-client';
import { City, Tour } from '@/types';
import { X } from 'lucide-react';

const tourSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  fromCityId: z.number({ message: 'From city is required' }),
  toCityId: z.number({ message: 'To city is required' }),
  durationDays: z.number().min(1, 'Duration must be at least 1 day'),
  distanceKm: z.number().min(0, 'Distance must be positive').optional(),
  basePrice: z.number().min(0, 'Price must be positive'),
  maxGroupSize: z.number().min(1, 'Max group size must be at least 1').optional(),
  imageUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  highlights: z.string().optional(),
  itinerary: z.string().optional(),
  inclusions: z.string().optional(),
  exclusions: z.string().optional(),
  isActive: z.boolean(),
  isFeatured: z.boolean(),
});

type TourFormData = z.infer<typeof tourSchema>;

interface TourFormProps {
  tour?: Tour;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function TourForm({ tour, onSuccess, onCancel }: TourFormProps) {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TourFormData>({
    resolver: zodResolver(tourSchema),
    defaultValues: tour ? {
      name: tour.name,
      description: tour.description,
      fromCityId: tour.fromCity?.id,
      toCityId: tour.toCity?.id,
      durationDays: tour.durationDays,
      distanceKm: tour.distanceKm,
      basePrice: tour.basePrice,
      maxGroupSize: tour.maxGroupSize,
      imageUrl: tour.imageUrl || '',
      highlights: tour.highlights || '',
      itinerary: tour.itinerary || '',
      inclusions: tour.inclusions || '',
      exclusions: tour.exclusions || '',
      isActive: tour.isActive,
      isFeatured: tour.isFeatured,
    } : {
      isActive: true,
      isFeatured: false,
      name: '',
      description: '',
      fromCityId: 0,
      toCityId: 0,
      durationDays: 0,
      basePrice: 0,
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

  const onSubmit = async (data: TourFormData) => {
    try {
      setLoading(true);
      if (tour) {
        await apiClient.updateTour(tour.id, data);
      } else {
        await apiClient.createTour(data);
      }
      onSuccess();
    } catch (err: any) {
      alert(err.response?.data?.message || err.message || 'Failed to save tour');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-xl sm:rounded-2xl w-full max-w-5xl my-4 sm:my-8 max-h-[95vh] flex flex-col">
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 flex-shrink-0">
          <h2 className="text-2xl font-bold text-gray-900">
            {tour ? 'Edit Tour' : 'Add New Tour'}
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
            {/* Tour Name */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tour Name *
              </label>
              <input
                type="text"
                {...register('name')}
                className="input w-full"
                placeholder="e.g., Goa Beach Paradise Tour"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                {...register('description')}
                className="input w-full"
                rows={4}
                placeholder="Enter detailed tour description..."
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
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

            {/* Duration */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration (Days) *
              </label>
              <input
                type="number"
                {...register('durationDays', { valueAsNumber: true })}
                className="input w-full"
                placeholder="e.g., 5"
              />
              {errors.durationDays && (
                <p className="text-red-500 text-sm mt-1">{errors.durationDays.message}</p>
              )}
            </div>

            {/* Distance */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Distance (KM)
              </label>
              <input
                type="number"
                {...register('distanceKm', { valueAsNumber: true })}
                className="input w-full"
                placeholder="e.g., 450"
              />
              {errors.distanceKm && (
                <p className="text-red-500 text-sm mt-1">{errors.distanceKm.message}</p>
              )}
            </div>

            {/* Base Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Base Price * (₹)
              </label>
              <input
                type="number"
                {...register('basePrice', { valueAsNumber: true })}
                className="input w-full"
                placeholder="e.g., 15000"
              />
              {errors.basePrice && (
                <p className="text-red-500 text-sm mt-1">{errors.basePrice.message}</p>
              )}
            </div>

            {/* Max Group Size */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Group Size
              </label>
              <input
                type="number"
                {...register('maxGroupSize', { valueAsNumber: true })}
                className="input w-full"
                placeholder="e.g., 15"
              />
              {errors.maxGroupSize && (
                <p className="text-red-500 text-sm mt-1">{errors.maxGroupSize.message}</p>
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
                placeholder="https://example.com/tour.jpg"
              />
              {errors.imageUrl && (
                <p className="text-red-500 text-sm mt-1">{errors.imageUrl.message}</p>
              )}
            </div>

            {/* Highlights */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Highlights (comma-separated)
              </label>
              <textarea
                {...register('highlights')}
                className="input w-full"
                rows={3}
                placeholder="e.g., Beach Activities, Water Sports, Sunset Cruise, Local Cuisine"
              />
            </div>

            {/* Itinerary */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Itinerary (Day-wise details)
              </label>
              <textarea
                {...register('itinerary')}
                className="input w-full"
                rows={4}
                placeholder="Day 1: Arrival and beach visit&#10;Day 2: Water sports&#10;Day 3: City tour..."
              />
            </div>

            {/* Inclusions */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Inclusions (comma-separated)
              </label>
              <textarea
                {...register('inclusions')}
                className="input w-full"
                rows={2}
                placeholder="e.g., Hotel Accommodation, Breakfast, Transportation, Guide"
              />
            </div>

            {/* Exclusions */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Exclusions (comma-separated)
              </label>
              <textarea
                {...register('exclusions')}
                className="input w-full"
                rows={2}
                placeholder="e.g., Lunch & Dinner, Personal Expenses, Travel Insurance"
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
              {loading ? 'Saving...' : tour ? 'Update Tour' : 'Create Tour'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
