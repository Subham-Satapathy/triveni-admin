'use client';

import { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api-client';
import { City } from '@/types';
import { Building2, Plus, Edit, Trash2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { slugify } from '@/lib/utils';

const citySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  slug: z.string().min(2, 'Slug must be at least 2 characters'),
});

type CityForm = z.infer<typeof citySchema>;

export default function CitiesPage() {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCity, setEditingCity] = useState<City | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CityForm>({
    resolver: zodResolver(citySchema),
  });

  const nameValue = watch('name');

  useEffect(() => {
    if (nameValue && !editingCity) {
      setValue('slug', slugify(nameValue));
    }
  }, [nameValue, editingCity, setValue]);

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    try {
      const data = await apiClient.getCities();
      setCities(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: CityForm) => {
    try {
      if (editingCity) {
        await apiClient.updateCity(editingCity.id, data);
      } else {
        await apiClient.createCity(data);
      }
      reset();
      setShowForm(false);
      setEditingCity(null);
      fetchCities();
    } catch (err: any) {
      alert(err.message || 'Failed to save city');
    }
  };

  const handleEdit = (city: City) => {
    setEditingCity(city);
    setValue('name', city.name);
    setValue('slug', city.slug);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this city?')) return;
    try {
      await apiClient.deleteCity(id);
      fetchCities();
    } catch (err: any) {
      alert(err.message || 'Failed to delete city');
    }
  };

  const handleCancel = () => {
    reset();
    setShowForm(false);
    setEditingCity(null);
  };

  if (loading) return <div className="text-center py-12">Loading cities...</div>;

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Cities</h1>
          <p className="text-gray-500 mt-1">Manage service locations</p>
        </div>
        {!showForm && (
          <button onClick={() => setShowForm(true)} className="bg-black text-white px-4 py-2.5 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add City
          </button>
        )}
      </div>

      {showForm && (
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            {editingCity ? 'Edit City' : 'Add New City'}
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="label text-gray-900 font-medium">City Name</label>
              <input {...register('name')} className="input mt-1" placeholder="Mumbai" />
              {errors.name && (
                <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>
            <div>
              <label className="label text-gray-900 font-medium">Slug</label>
              <input
                {...register('slug')}
                className="input mt-1"
                placeholder="mumbai"
              />
              {errors.slug && (
                <p className="text-red-600 text-sm mt-1">{errors.slug.message}</p>
              )}
            </div>
            <div className="flex gap-2">
              <button type="submit" className="bg-black text-white px-4 py-2.5 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                {editingCity ? 'Update City' : 'Create City'}
              </button>
              <button type="button" onClick={handleCancel} className="bg-gray-100 text-gray-700 px-4 py-2.5 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cities.map((city) => (
          <div key={city.id} className="bg-white rounded-xl border border-gray-100 p-5 flex items-center justify-between hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="bg-gray-100 p-3 rounded-xl">
                <Building2 className="w-6 h-6 text-gray-700" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-base">{city.name}</h3>
                <p className="text-sm text-gray-500">{city.slug}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(city)}
                className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                title="Edit"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(city.id)}
                className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
