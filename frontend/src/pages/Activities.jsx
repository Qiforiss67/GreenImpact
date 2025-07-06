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
    loadUserProgress();
  }, [state.filters]);

  const loadUserProgress = async () => {
    try {
      const progress = await apiService.getProgress();
      actions.setProgress(progress);
    } catch (error) {
      console.error('Failed to load progress:', error);
    }
  };

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
    const activityId = activity._id || activity.id;
    if (!state.userProgress.completedActivities.includes(activityId)) {
      setCompleteModal({ isOpen: true, activity });
    }
  };

  const confirmComplete = async () => {
    try {
      const activityId = completeModal.activity._id || completeModal.activity.id;
      const result = await apiService.completeActivity(activityId, completeModal.activity.points);
      
      // Update progress dari response backend
      if (result.progress) {
        actions.setProgress(result.progress);
      } else {
        // Fallback: reload progress
        await loadUserProgress();
      }
      
      setCompleteModal({ isOpen: false, activity: null });
    } catch (error) {
      console.error('Failed to complete activity:', error);
      alert('Error completing activity: ' + error.message);
    }
  };

  const isCompleted = (activity) => {
    const activityId = activity._id || activity.id;
    return state.userProgress.completedActivities.includes(activityId);
  };

  return (
    <div className="bg-gradient-to-br from-green-50 to-blue-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">🎯 SDG Activities</h1>
          <p className="text-lg sm:text-xl opacity-90">Take action and make a difference in the world</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8 sm:py-12">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center border border-gray-100">
            <div className="text-2xl sm:text-3xl font-bold text-primary mb-3">{activities.length}</div>
            <div className="text-sm sm:text-base text-gray-600 font-medium">Available Activities</div>
          </div>
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center border border-gray-100">
            <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-3">{state.userProgress.completedActivities.length}</div>
            <div className="text-sm sm:text-base text-gray-600 font-medium">Completed</div>
          </div>
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center border border-gray-100">
            <div className="text-2xl sm:text-3xl font-bold text-yellow-600 mb-3">{state.userProgress.points}</div>
            <div className="text-sm sm:text-base text-gray-600 font-medium">Points Earned</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg mb-8">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">🔍 Filter Activities</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <select 
              value={state.filters.category}
              onChange={(e) => actions.setFilters({ category: e.target.value })}
              className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
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
              className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
            >
              <option value="all">All Difficulties</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredActivities.map((activity, index) => {
            const completed = isCompleted(activity);
            return (
              <div 
                key={activity._id || activity.id} 
                className={`bg-white p-4 sm:p-6 lg:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-l-4 ${
                  completed ? 'border-green-500 bg-green-50' : 'border-blue-500'
                }`}
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="grid grid-cols-3 gap-4 items-start mb-4 sm:mb-6">
                  <h3 className="col-span-2 text-lg sm:text-xl font-bold text-gray-800 leading-tight">{activity.title}</h3>
                  <div className="col-span-1 flex flex-col items-end gap-2">
                    <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap">
                      SDG {activity.sdg}
                    </span>
                    {completed && <span className="text-green-500 text-xl sm:text-2xl">✓</span>}
                  </div>
                </div>
                
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">{activity.description}</p>
                
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-2">
                  <div className="flex flex-wrap gap-2 text-xs sm:text-sm">
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
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-bold text-xs sm:text-sm self-start sm:self-auto">
                    ⭐ {activity.points}
                  </span>
                </div>
                
                <button 
                  onClick={() => handleCompleteActivity(activity)}
                  disabled={completed}
                  className={`w-full py-2 sm:py-3 rounded-full font-semibold transition-all transform hover:scale-105 text-sm sm:text-base ${
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