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
      await apiService.deleteActivity(deleteModal.activity.id);
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
        await apiService.updateActivity(editingActivity.id, formData);
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
    setFormData(activity);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({ title: '', category: 'environment', difficulty: 'easy', points: 10, sdg: 1, description: '' });
    setEditingActivity(null);
    setShowForm(false);
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 min-h-screen">
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">🛡️ Admin Dashboard</h1>
          <p className="text-xl opacity-90">Manage platform activities and monitor user engagement</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-12">
        {/* Admin Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-xl text-center">
            <div className="text-3xl font-bold mb-2">{stats.totalUsers}</div>
            <div className="text-sm opacity-90">Registered Users</div>
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
        <div className="bg-white p-8 rounded-2xl shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">👥 User Management</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Email</th>
                  <th className="text-left py-3 px-4">Role</th>
                  <th className="text-left py-3 px-4">Join Date</th>
                  <th className="text-left py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{user.email}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="py-3 px-4">Dec 2024</td>
                    <td className="py-3 px-4">
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
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">🎯 Activities Management</h2>
            <button 
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all transform hover:scale-105"
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map(activity => (
              <div key={activity.id} className="border border-gray-200 p-6 rounded-lg hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-semibold text-gray-800">{activity.title}</h3>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                    SDG {activity.sdg}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-4">{activity.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex gap-2 text-xs">
                    <span className="bg-gray-100 px-2 py-1 rounded">{activity.category}</span>
                    <span className="bg-gray-100 px-2 py-1 rounded">{activity.difficulty}</span>
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">⭐ {activity.points}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(activity)}
                    className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors text-sm"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDeleteActivity(activity)}
                    className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600 transition-colors text-sm"
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