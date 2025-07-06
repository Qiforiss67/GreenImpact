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

  const loadUserData = async () => {
    try {
      const progress = await apiService.getProgress();
      setUserProgress(progress);
      
      const allActivities = await apiService.getActivities();
      const completed = allActivities.filter(activity => 
        progress.completedActivities.includes(activity.id)
      );
      setCompletedActivities(completed);
    } catch (error) {
      console.error('Failed to load user data:', error);
    }
  };

  return (
    <div className="bg-gradient-to-br from-green-50 to-blue-50 min-h-screen">
      <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white py-16">
        <div className="max-w-6xl mx-auto px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">📊 My Progress</h1>
          <p className="text-xl opacity-90">Track your personal SDG journey and achievements</p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-8 py-12">
        
        {/* Progress Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-8 rounded-2xl shadow-xl text-center">
            <div className="text-4xl font-bold mb-2">{userProgress.points}</div>
            <div className="text-lg opacity-90">Total Points</div>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-8 rounded-2xl shadow-xl text-center">
            <div className="text-4xl font-bold mb-2">{completedActivities.length}</div>
            <div className="text-lg opacity-90">Completed Activities</div>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-8 rounded-2xl shadow-xl text-center">
            <div className="text-4xl font-bold mb-2">{userProgress.level}</div>
            <div className="text-lg opacity-90">Current Level</div>
          </div>
        </div>

        {/* Completed Activities */}
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">🏆 Completed Activities</h2>
          {completedActivities.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🌱</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No activities completed yet</h3>
              <p className="text-gray-500">Start completing activities to see your progress here!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedActivities.map((activity) => (
                <div 
                  key={activity.id} 
                  className="bg-green-50 border border-green-200 p-6 rounded-xl"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-semibold text-gray-800">{activity.title}</h3>
                    <div className="flex flex-col items-end gap-1">
                      <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        SDG {activity.sdg}
                      </span>
                      <span className="text-green-500 text-xl">✓</span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{activity.description}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2 text-xs">
                      <span className="bg-gray-100 px-2 py-1 rounded">{activity.category}</span>
                      <span className="bg-gray-100 px-2 py-1 rounded">{activity.difficulty}</span>
                    </div>
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full font-bold text-xs">
                      +{activity.points} pts
                    </span>
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