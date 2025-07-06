import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import apiService from '../utils/api';
import ConfirmModal from '../components/ConfirmModal';

const Activities = () => {
  const { state, actions } = useApp();
  const [activities, setActivities] = useState([]);
  const [completeModal, setCompleteModal] = useState({ isOpen: false, activity: null });

  useEffect(() => {
    loadActivities();
  }, [state.filters]);

  const loadActivities = async () => {
    try {
      const data = await apiService.getActivities(state.filters);
      setActivities(data);
      actions.setActivities(data);
    } catch (error) {
      console.error('Failed to load activities:', error);
    }
  };

  const filteredActivities = activities.filter(activity => {
    const categoryMatch = state.filters.category === 'all' || activity.category === state.filters.category;
    const difficultyMatch = state.filters.difficulty === 'all' || activity.difficulty === state.filters.difficulty;
    return categoryMatch && difficultyMatch;
  });

  const handleCompleteActivity = (activity) => {
    if (!state.userProgress.completedActivities.includes(activity.id)) {
      setCompleteModal({ isOpen: true, activity });
    }
  };

  const confirmComplete = async () => {
    try {
      await apiService.completeActivity(completeModal.activity.id, completeModal.activity.points);
      actions.addActivity(completeModal.activity);
      setCompleteModal({ isOpen: false, activity: null });
    } catch (error) {
      console.error('Failed to complete activity:', error);
    }
  };

  const isCompleted = (activityId) => state.userProgress.completedActivities.includes(activityId);

  return (
    <div className="bg-gradient-to-br from-green-50 to-blue-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white py-16">
        <div className="max-w-6xl mx-auto px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">🎯 SDG Activities</h1>
          <p className="text-xl opacity-90">Take action and make a difference in the world</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-12">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
            <div className="text-3xl font-bold text-primary mb-2">{activities.length}</div>
            <div className="text-gray-600">Available Activities</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{state.userProgress.completedActivities.length}</div>
            <div className="text-gray-600">Completed</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
            <div className="text-3xl font-bold text-yellow-600 mb-2">{state.userProgress.points}</div>
            <div className="text-gray-600">Points Earned</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">🔍 Filter Activities</h2>
          <div className="flex flex-wrap gap-4">
            <select 
              value={state.filters.category}
              onChange={(e) => actions.setFilters({ category: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Categories</option>
              <option value="environment">Environment</option>
              <option value="social">Social</option>
              <option value="education">Education</option>
              <option value="economic">Economic</option>
            </select>
            
            <select 
              value={state.filters.difficulty}
              onChange={(e) => actions.setFilters({ difficulty: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Difficulties</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredActivities.map((activity, index) => {
            const completed = isCompleted(activity.id);
            return (
              <div 
                key={activity.id} 
                className={`bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-l-4 ${
                  completed ? 'border-green-500 bg-green-50' : 'border-blue-500'
                }`}
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-xl font-bold text-gray-800">{activity.title}</h3>
                  <div className="flex flex-col items-end gap-2">
                    <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      SDG {activity.sdg}
                    </span>
                    {completed && <span className="text-green-500 text-2xl">✓</span>}
                  </div>
                </div>
                
                <p className="text-gray-600 mb-6 leading-relaxed">{activity.description}</p>
                
                <div className="flex justify-between items-center mb-6">
                  <div className="flex gap-2 text-sm">
                    <span className={`px-3 py-1 rounded-full font-medium ${
                      activity.category === 'environment' ? 'bg-green-100 text-green-800' :
                      activity.category === 'social' ? 'bg-blue-100 text-blue-800' :
                      activity.category === 'education' ? 'bg-purple-100 text-purple-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {activity.category}
                    </span>
                    <span className={`px-3 py-1 rounded-full font-medium ${
                      activity.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                      activity.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {activity.difficulty}
                    </span>
                  </div>
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-bold text-sm">
                    ⭐ {activity.points}
                  </span>
                </div>
                
                <button 
                  onClick={() => handleCompleteActivity(activity)}
                  disabled={completed}
                  className={`w-full py-3 rounded-full font-semibold transition-all transform hover:scale-105 ${
                    completed 
                      ? 'bg-green-500 text-white cursor-not-allowed' 
                      : 'bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg'
                  }`}
                >
                  {completed ? '✓ Completed' : '🚀 Complete Activity'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
      
      <ConfirmModal
        isOpen={completeModal.isOpen}
        onClose={() => setCompleteModal({ isOpen: false, activity: null })}
        onConfirm={confirmComplete}
        title="Complete Activity"
        message={`Complete "${completeModal.activity?.title}" and earn ${completeModal.activity?.points} points?`}
        confirmText="Complete"
        cancelText="Cancel"
        type="info"
      />
    </div>
  );
};

export default Activities;