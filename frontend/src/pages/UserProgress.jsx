import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import apiService from '../utils/api';

const UserProgress = () => {
  const { state } = useApp();
  const [completedActivities, setCompletedActivities] = useState([]);
  const [userProgress, setUserProgress] = useState({ points: 0, completedActivities: [], level: 'Beginner' });

  useEffect(() => {
    loadUserData();
  }, []);

  useEffect(() => {
    // Reload progress when user changes
    if (state.user) {
      loadUserData();
    }
  }, [state.user]);

  const loadUserData = async () => {
    try {
      const progress = await apiService.getProgress();
      setUserProgress(progress);
      
      const allActivities = await apiService.getActivities();
      const completed = allActivities.filter(activity => {
        const activityId = activity._id || activity.id;
        return progress.completedActivities.includes(activityId);
      });
      setCompletedActivities(completed);
    } catch (error) {
      console.error('Failed to load user data:', error);
    }
  };

  return (
    <div className="bg-gradient-to-br from-green-50 to-blue-50 min-h-screen">
      <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white py-16">
        <div className="max-w-6xl mx-auto px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">📅 My Activity History</h1>
          <p className="text-xl opacity-90">Detailed view of your completed activities and personal journey</p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-8 py-12">
        
        {/* Activity Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center border-l-4 border-blue-500">
            <div className="text-2xl font-bold text-blue-600 mb-2">{completedActivities.length}</div>
            <div className="text-sm text-gray-600">Activities Done</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center border-l-4 border-green-500">
            <div className="text-2xl font-bold text-green-600 mb-2">{completedActivities.filter(a => a.difficulty === 'easy').length}</div>
            <div className="text-sm text-gray-600">Easy Tasks</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center border-l-4 border-yellow-500">
            <div className="text-2xl font-bold text-yellow-600 mb-2">{completedActivities.filter(a => a.difficulty === 'medium').length}</div>
            <div className="text-sm text-gray-600">Medium Tasks</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center border-l-4 border-red-500">
            <div className="text-2xl font-bold text-red-600 mb-2">{completedActivities.filter(a => a.difficulty === 'hard').length}</div>
            <div className="text-sm text-gray-600">Hard Tasks</div>
          </div>
        </div>
        
        {/* SDG Categories */}
        <div className="bg-white p-8 rounded-2xl shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">🌍 My SDG Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17].map(sdg => {
              const count = completedActivities.filter(a => a.sdg === sdg).length;
              return (
                <div key={sdg} className={`p-4 rounded-lg text-center ${
                  count > 0 ? 'bg-green-100 border-2 border-green-300' : 'bg-gray-100 border-2 border-gray-200'
                }`}>
                  <div className={`text-lg font-bold ${
                    count > 0 ? 'text-green-700' : 'text-gray-400'
                  }`}>SDG {sdg}</div>
                  <div className={`text-sm ${
                    count > 0 ? 'text-green-600' : 'text-gray-400'
                  }`}>{count} activities</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Activity Timeline */}
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">📅 Activity Timeline</h2>
          {completedActivities.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🌱</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No activities completed yet</h3>
              <p className="text-gray-500">Start completing activities to see your progress here!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {completedActivities.map((activity, index) => (
                <div 
                  key={activity._id || activity.id} 
                  className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-gray-800">{activity.title}</h3>
                      <div className="flex items-center space-x-2">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold">
                          SDG {activity.sdg}
                        </span>
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-bold">
                          +{activity.points} pts
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-3">{activity.description}</p>
                    <div className="flex items-center space-x-3 text-sm">
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
                      <span className="text-gray-500">• Completed recently</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProgress;