import React, { useState, useEffect } from 'react';
import apiService from '../utils/api';
import ConfirmModal from '../components/ConfirmModal';

const ManageActivities = () => {
  const [activities, setActivities] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingActivity, setEditingActivity] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, activity: null });
  const [formData, setFormData] = useState({
    title: '',
    category: 'environment',
    difficulty: 'easy',
    points: 10,
    sdg: 1,
    description: ''
  });

  useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities = async () => {
    try {
      const data = await apiService.getActivities();
      setActivities(data);
    } catch (error) {
      console.error('Failed to load activities:', error);
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
      loadActivities();
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

  const handleDelete = (activity) => {
    setDeleteModal({ isOpen: true, activity });
  };

  const confirmDelete = async () => {
    try {
      await apiService.deleteActivity(deleteModal.activity.id);
      loadActivities();
      setDeleteModal({ isOpen: false, activity: null });
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const resetForm = () => {
    setFormData({ title: '', category: 'environment', difficulty: 'easy', points: 10, sdg: 1, description: '' });
    setEditingActivity(null);
    setShowForm(false);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-green-50 min-h-screen">
      <div className="bg-gradient-to-r from-primary to-secondary text-white py-12">
        <div className="max-w-6xl mx-auto px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-5xl font-bold mb-2">📋 My Activities</h1>
              <p className="text-xl opacity-90">Track and manage your personal SDG activities</p>
            </div>
            <button 
              onClick={() => setShowForm(true)}
              className="bg-white text-primary px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
            >
              ➕ Add Activity
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-8 py-8">

      {showForm && (
        <div className="bg-white p-8 rounded-2xl shadow-xl mb-8 border border-gray-100">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
            {editingActivity ? '✏️ Edit' : '✨ Add'} Activity
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Title"
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
              placeholder="SDG Number"
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
            <div className="md:col-span-2 flex gap-4">
              <button type="submit" className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all transform hover:scale-105">
                {editingActivity ? '🔄 Update' : '✨ Create'}
              </button>
              <button type="button" onClick={resetForm} className="bg-gray-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-600 transition-all">
                ❌ Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {activities.map((activity, index) => (
          <div 
            key={activity.id} 
            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            style={{animationDelay: `${index * 0.1}s`}}
          >
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-xl font-bold text-gray-800">{activity.title}</h3>
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                SDG {activity.sdg}
              </span>
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">{activity.description}</p>
            <div className="flex justify-between items-center mb-6">
              <div className="flex gap-2 text-sm">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium">{activity.category}</span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">{activity.difficulty}</span>
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-bold">⭐ {activity.points}</span>
              </div>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => handleEdit(activity)}
                className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 rounded-full font-semibold hover:shadow-lg transition-all transform hover:scale-105"
              >
                ✏️ Edit
              </button>
              <button 
                onClick={() => handleDelete(activity)}
                className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white py-2 rounded-full font-semibold hover:shadow-lg transition-all transform hover:scale-105"
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
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

export default ManageActivities;