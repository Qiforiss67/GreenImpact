import React, { useState, useEffect } from 'react';
import apiService from '../utils/api';
import ConfirmModal from '../components/ConfirmModal';

const AdminDashboard = () => {
  const [activities, setActivities] = useState([]);
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({ totalUsers: 0, totalActivities: 0, totalPoints: 0 });
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, activity: null });
  const [showForm, setShowForm] = useState(false);
  const [editingActivity, setEditingActivity] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'environment',
    difficulty: 'easy',
    points: 10,
    sdg: 1,
    description: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const activitiesData = await apiService.getActivities();
      setActivities(activitiesData);
      
      // Mock user data and stats
      setUsers([
        { id: 1, email: 'admin@greenimpact.com', role: 'admin' },
        { id: 2, email: 'user@greenimpact.com', role: 'user' },
        { id: 3, email: 'demo@example.com', role: 'user' }
      ]);
      
      setStats({
        totalUsers: 3,
        totalActivities: activitiesData.length,
        totalPoints: 277
      });
    } catch (error) {
      console.error('Failed to load data:', error);
    }
  };

  const handleDeleteActivity = (activity) => {
    setDeleteModal({ isOpen: true, activity });
  };

  const confirmDelete = async () => {
    try {
      const activityId = deleteModal.activity._id || deleteModal.activity.id;
      await apiService.deleteActivity(activityId);
      loadData();
      setDeleteModal({ isOpen: false, activity: null });
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingActivity) {
        const activityId = editingActivity._id || editingActivity.id;
        await apiService.updateActivity(activityId, formData);
      } else {
        await apiService.createActivity(formData);
      }
      loadData();
      resetForm();
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const handleEdit = (activity) => {
    setEditingActivity(activity);
    setFormData({
      title: activity.title,
      category: activity.category,
      difficulty: activity.difficulty,
      points: activity.points,
      sdg: activity.sdg,
      description: activity.description
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({ title: '', category: 'environment', difficulty: 'easy', points: 10, sdg: 1, description: '' });
    setEditingActivity(null);
    setShowForm(false);
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 min-h-screen">
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">🛡️ Admin Dashboard</h1>
          <p className="text-lg sm:text-xl opacity-90">Manage platform activities and monitor user engagement</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8 sm:py-12">
        {/* Admin Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 sm:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 text-center transform hover:scale-105">
            <div className="text-2xl sm:text-3xl font-bold mb-3">{stats.totalUsers}</div>
            <div className="text-xs sm:text-sm opacity-90 font-medium">Registered Users</div>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-2xl shadow-xl text-center">
            <div className="text-3xl font-bold mb-2">{stats.totalActivities}</div>
            <div className="text-sm opacity-90">Created Activities</div>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-2xl shadow-xl text-center">
            <div className="text-3xl font-bold mb-2">17</div>
            <div className="text-sm opacity-90">SDG Categories</div>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-2xl shadow-xl text-center">
            <div className="text-3xl font-bold mb-2">95%</div>
            <div className="text-sm opacity-90">Platform Uptime</div>
          </div>
        </div>

        {/* Users Management */}
        <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-2xl shadow-lg mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">👥 User Management</h2>
          
          {/* Mobile Cards */}
          <div className="block sm:hidden space-y-4">
            {users.map(user => (
              <div key={user.id} className="bg-gray-50 p-4 rounded-lg">
                <div className="font-semibold text-gray-800 mb-2">{user.email}</div>
                <div className="flex justify-between items-center">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {user.role}
                  </span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                    Active
                  </span>
                </div>
                <div className="text-sm text-gray-600 mt-2">Joined: Dec 2024</div>
              </div>
            ))}
          </div>
          
          {/* Desktop Table */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2 lg:px-4 text-sm lg:text-base">Email</th>
                  <th className="text-left py-3 px-2 lg:px-4 text-sm lg:text-base">Role</th>
                  <th className="text-left py-3 px-2 lg:px-4 text-sm lg:text-base">Join Date</th>
                  <th className="text-left py-3 px-2 lg:px-4 text-sm lg:text-base">Status</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-2 lg:px-4 text-sm lg:text-base">{user.email}</td>
                    <td className="py-3 px-2 lg:px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="py-3 px-2 lg:px-4 text-sm lg:text-base">Dec 2024</td>
                    <td className="py-3 px-2 lg:px-4">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                        Active
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Activities Management */}
        <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-2xl shadow-lg">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">🎯 Activities Management</h2>
            <button 
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-primary to-secondary text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold hover:shadow-lg transition-all transform hover:scale-105 text-sm sm:text-base"
            >
              ➕ Create Activity
            </button>
          </div>
          
          {showForm && (
            <div className="bg-gray-50 p-6 rounded-xl mb-6 border">
              <h3 className="text-lg font-bold mb-4">{editingActivity ? '✏️ Edit' : '✨ Create'} Activity</h3>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Activity Title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="px-3 py-2 border rounded-md"
                  required
                />
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="px-3 py-2 border rounded-md"
                >
                  <option value="environment">Environment</option>
                  <option value="social">Social</option>
                  <option value="education">Education</option>
                  <option value="economic">Economic</option>
                </select>
                <select
                  value={formData.difficulty}
                  onChange={(e) => setFormData({...formData, difficulty: e.target.value})}
                  className="px-3 py-2 border rounded-md"
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
                <input
                  type="number"
                  placeholder="Points"
                  value={formData.points}
                  onChange={(e) => setFormData({...formData, points: parseInt(e.target.value)})}
                  className="px-3 py-2 border rounded-md"
                  min="1"
                  required
                />
                <input
                  type="number"
                  placeholder="SDG Number (1-17)"
                  value={formData.sdg}
                  onChange={(e) => setFormData({...formData, sdg: parseInt(e.target.value)})}
                  className="px-3 py-2 border rounded-md"
                  min="1"
                  max="17"
                  required
                />
                <textarea
                  placeholder="Description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="px-3 py-2 border rounded-md md:col-span-2"
                  rows="3"
                  required
                />
                <div className="md:col-span-2 flex gap-3">
                  <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                    {editingActivity ? '💾 Update' : '✨ Create'}
                  </button>
                  <button type="button" onClick={resetForm} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
                    ❌ Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {activities.map(activity => (
              <div key={activity._id || activity.id} className="bg-white border border-gray-200 p-6 sm:p-8 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-l-blue-500">
                <div className="grid grid-cols-3 gap-4 items-start mb-6">
                  <h3 className="col-span-2 font-bold text-gray-800 text-base sm:text-lg leading-tight">{activity.title}</h3>
                  <div className="col-span-1 flex justify-end">
                    <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap">
                      SDG {activity.sdg}
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-6 leading-relaxed">{activity.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">{activity.category}</span>
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">{activity.difficulty}</span>
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-bold">⭐ {activity.points}</span>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={() => handleEdit(activity)}
                    className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors text-xs sm:text-sm"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDeleteActivity(activity)}
                    className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600 transition-colors text-xs sm:text-sm"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, activity: null })}
        onConfirm={confirmDelete}
        title="Delete Activity"
        message={`Are you sure you want to delete "${deleteModal.activity?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
    </div>
  );
};

export default AdminDashboard;