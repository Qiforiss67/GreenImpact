import React from 'react';
import { useApp } from '../context/AppContext';

const Progress = () => {
  const { state } = useApp();

  const achievements = [
    { id: 1, title: 'First Steps', description: 'Complete your first activity', threshold: 1, icon: '🌱' },
    { id: 2, title: 'Eco Warrior', description: 'Earn 50 points', threshold: 50, icon: '⚔️' },
    { id: 3, title: 'SDG Champion', description: 'Complete 10 activities', threshold: 10, icon: '🏆' },
    { id: 4, title: 'Planet Protector', description: 'Earn 100 points', threshold: 100, icon: '🌍' }
  ];

  const getAchievementStatus = (achievement) => {
    if (achievement.title.includes('points')) {
      return state.userProgress.points >= achievement.threshold;
    }
    return state.userProgress.completedActivities.length >= achievement.threshold;
  };

  const completedAchievements = achievements.filter(getAchievementStatus);
  const progressPercentage = Math.min((state.userProgress.points / 100) * 100, 100);

  return (
    <div className="bg-gradient-to-br from-purple-50 to-green-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white py-16">
        <div className="max-w-6xl mx-auto px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">📈 Your Progress</h1>
          <p className="text-xl opacity-90">Track your journey towards sustainable impact</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-12">
        {/* Main Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-8 rounded-2xl shadow-xl text-center transform hover:scale-105 transition-all">
            <div className="text-5xl font-bold mb-2">{state.userProgress.points}</div>
            <div className="text-xl opacity-90">Total Points</div>
            <div className="mt-4 bg-white/20 rounded-full h-2">
              <div className="bg-white rounded-full h-2" style={{width: `${Math.min(state.userProgress.points / 10, 100)}%`}}></div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-8 rounded-2xl shadow-xl text-center transform hover:scale-105 transition-all">
            <div className="text-5xl font-bold mb-2">{state.userProgress.completedActivities.length}</div>
            <div className="text-xl opacity-90">Activities Completed</div>
            <div className="mt-4 bg-white/20 rounded-full h-2">
              <div className="bg-white rounded-full h-2" style={{width: `${Math.min(state.userProgress.completedActivities.length * 20, 100)}%`}}></div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-8 rounded-2xl shadow-xl text-center transform hover:scale-105 transition-all">
            <div className="text-5xl font-bold mb-2">{completedAchievements.length}</div>
            <div className="text-xl opacity-90">Achievements Unlocked</div>
            <div className="mt-4 bg-white/20 rounded-full h-2">
              <div className="bg-white rounded-full h-2" style={{width: `${(completedAchievements.length / achievements.length) * 100}%`}}></div>
            </div>
          </div>
        </div>

        {/* Level Progress */}
        <div className="bg-white p-8 rounded-2xl shadow-lg mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">🎆 Progress to Next Level</h2>
            <div className="relative">
              <div className="w-full bg-gray-200 rounded-full h-6 mb-4">
                <div 
                  className="bg-gradient-to-r from-green-400 to-green-600 h-6 rounded-full transition-all duration-500 flex items-center justify-end pr-2"
                  style={{width: `${progressPercentage}%`}}
                >
                  <span className="text-white text-xs font-bold">{Math.round(progressPercentage)}%</span>
                </div>
              </div>
              <p className="text-gray-600 text-lg">{state.userProgress.points}/100 points to Planet Protector</p>
            </div>
          </div>
          
          {/* Level Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { level: 'Beginner', min: 0, icon: '🌱', color: 'bg-green-100 text-green-800' },
              { level: 'Eco Warrior', min: 25, icon: '⚔️', color: 'bg-blue-100 text-blue-800' },
              { level: 'SDG Champion', min: 50, icon: '🏆', color: 'bg-yellow-100 text-yellow-800' },
              { level: 'Planet Protector', min: 100, icon: '🌍', color: 'bg-purple-100 text-purple-800' }
            ].map((badge, index) => (
              <div key={index} className={`p-4 rounded-lg text-center ${
                state.userProgress.points >= badge.min ? badge.color : 'bg-gray-100 text-gray-400'
              }`}>
                <div className="text-2xl mb-2">{badge.icon}</div>
                <div className="font-semibold text-sm">{badge.level}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">🏅 Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => {
              const isUnlocked = getAchievementStatus(achievement);
              return (
                <div 
                  key={achievement.id} 
                  className={`p-8 rounded-2xl text-center border-2 transition-all duration-300 transform hover:scale-105 ${
                    isUnlocked 
                      ? 'bg-gradient-to-br from-green-100 to-green-200 border-green-300 shadow-lg' 
                      : 'bg-gray-100 border-gray-300 opacity-60'
                  }`}
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className={`text-6xl mb-4 ${
                    isUnlocked ? 'animate-bounce' : 'grayscale'
                  }`}>{achievement.icon}</div>
                  <h3 className="font-bold text-lg mb-3 text-gray-800">{achievement.title}</h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">{achievement.description}</p>
                  {isUnlocked ? (
                    <div className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                      ✓ Unlocked
                    </div>
                  ) : (
                    <div className="bg-gray-300 text-gray-600 px-4 py-2 rounded-full text-sm">
                      🔒 Locked
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* SDG Impact */}
        <div className="bg-white p-12 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">🌍 Your SDG Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Climate Action', icon: '🌍', count: 2, color: 'from-green-400 to-green-600', sdg: 13 },
              { title: 'Clean Water', icon: '💧', count: 1, color: 'from-blue-400 to-blue-600', sdg: 6 },
              { title: 'Zero Hunger', icon: '🌾', count: 1, color: 'from-yellow-400 to-yellow-600', sdg: 2 }
            ].map((impact, index) => (
              <div key={index} className={`bg-gradient-to-br ${impact.color} text-white p-8 rounded-2xl text-center transform hover:scale-105 transition-all shadow-lg`}>
                <div className="text-5xl mb-4">{impact.icon}</div>
                <h3 className="text-xl font-bold mb-2">{impact.title}</h3>
                <div className="text-3xl font-bold mb-2">{impact.count}</div>
                <p className="opacity-90">activities completed</p>
                <div className="mt-4 bg-white/20 rounded-full px-3 py-1 text-sm">
                  SDG {impact.sdg}
                </div>
              </div>
            ))}
          </div>
          
          {/* Weekly Goal */}
          <div className="mt-12 text-center">
            <h3 className="text-xl font-bold text-gray-800 mb-4">🎯 Weekly Goal</h3>
            <div className="bg-gray-100 rounded-full h-4 max-w-md mx-auto">
              <div className="bg-gradient-to-r from-primary to-secondary h-4 rounded-full" style={{width: '60%'}}></div>
            </div>
            <p className="text-gray-600 mt-2">3 of 5 activities completed this week</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;