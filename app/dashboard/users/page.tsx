'use client';

import { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api-client';
import { User } from '@/types';
import { formatDateTime } from '@/lib/utils';
import { Users as UsersIcon, Mail, Phone, Calendar, Shield, Trash2, Power, PowerOff } from 'lucide-react';

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await apiClient.getUsers();
      setUsers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleUserStatus = async (id: number, currentStatus: boolean) => {
    try {
      await apiClient.updateUser(id, { isActive: !currentStatus });
      fetchUsers();
    } catch (err: any) {
      alert(err.message || 'Failed to update user');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) return;
    try {
      await apiClient.deleteUser(id);
      fetchUsers();
    } catch (err: any) {
      alert(err.message || 'Failed to delete user');
    }
  };

  if (loading) return <div className="text-center py-12">Loading users...</div>;

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Users</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">Manage customer accounts</p>
        </div>
        <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-gray-100 rounded-lg">
          <UsersIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
          <span className="text-sm sm:text-base font-semibold text-gray-900">{users.length} Total Users</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user.id} className="bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200">
              <div className="p-4 sm:p-5">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg sm:text-xl flex-shrink-0">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 truncate">{user.name}</h3>
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        <span className={`inline-flex items-center px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold ${
                          user.isActive
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {user.isActive ? '● Active' : '○ Inactive'}
                        </span>
                        <span className="inline-flex items-center px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold bg-purple-100 text-purple-700">
                          <Shield className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1" />
                          {user.role}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-left sm:text-right flex-shrink-0">
                    <p className="text-[10px] sm:text-xs text-gray-500 mb-0.5">Member Since</p>
                    <div className="flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm text-gray-700">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="truncate">{formatDateTime(user.createdAt)}</span>
                    </div>
                  </div>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
                  {/* Contact Info */}
                  <div className="lg:col-span-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div className="flex items-center gap-2.5 sm:gap-3">
                        <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-green-50 flex items-center justify-center">
                          <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-600" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs sm:text-sm text-gray-900 truncate">{user.email}</p>
                          <p className="text-[10px] sm:text-xs text-gray-500">Email Address</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5 sm:gap-3">
                        <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-orange-50 flex items-center justify-center">
                          <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-600" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs sm:text-sm text-gray-900">{user.phone}</p>
                          <p className="text-[10px] sm:text-xs text-gray-500">Phone Number</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="lg:col-span-4 flex flex-col gap-2">
                    <button
                      onClick={() => toggleUserStatus(user.id, user.isActive)}
                      className={`w-full px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2 ${
                        user.isActive
                          ? 'bg-red-50 text-red-700 hover:bg-red-100 border border-red-200'
                          : 'bg-green-50 text-green-700 hover:bg-green-100 border border-green-200'
                      }`}
                    >
                      {user.isActive ? (
                        <>
                          <PowerOff className="w-4 h-4" />
                          Deactivate User
                        </>
                      ) : (
                        <>
                          <Power className="w-4 h-4" />
                          Activate User
                        </>
                      )}
                    </button>
                    
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="w-full px-4 py-2.5 bg-gray-900 text-white hover:bg-gray-800 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete User
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
            <UsersIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No users found</h3>
            <p className="text-gray-500">User accounts will appear here once customers sign up.</p>
          </div>
        )}
      </div>
    </div>
  );
}
