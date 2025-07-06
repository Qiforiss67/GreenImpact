import React from 'react';

const Community = () => {
  const leaderboard = [
    { rank: 1, name: 'EcoWarrior123', points: 2450, activities: 89, badge: '🏆' },
    { rank: 2, name: 'GreenHero', points: 2180, activities: 76, badge: '🥈' },
    { rank: 3, name: 'SustainableSam', points: 1950, activities: 68, badge: '🥉' },
    { rank: 4, name: 'ClimateChamp', points: 1720, activities: 54, badge: '🌟' },
    { rank: 5, name: 'EcoFriendly', points: 1580, activities: 49, badge: '🌱' }
  ];

  const achievements = [
    { title: 'Tree Planter', description: 'Planted 100+ trees', icon: '🌳', users: 234 },
    { title: 'Water Saver', description: 'Reduced water usage by 50%', icon: '💧', users: 189 },
    { title: 'Energy Efficient', description: 'Switched to renewable energy', icon: '⚡', users: 156 },
    { title: 'Waste Warrior', description: 'Zero waste for 30 days', icon: '♻️', users: 98 }
  ];

  return (
    <div className="bg-gradient-to-br from-blue-50 to-green-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-primary mb-6">👥 Community</h1>
          <p className="text-xl text-gray-600">
            Connect with fellow eco-warriors and see how you stack up!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Leaderboard */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-primary mb-6 flex items-center">
              🏆 Top Contributors
            </h2>
            <div className="space-y-4">
              {leaderboard.map(user => (
                <div key={user.rank} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl">{user.badge}</span>
                    <div>
                      <h3 className="font-semibold text-gray-800">{user.name}</h3>
                      <p className="text-sm text-gray-600">{user.activities} activities completed</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-primary">{user.points}</p>
                    <p className="text-xs text-gray-500">points</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Community Achievements */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-primary mb-6 flex items-center">
              🎖️ Community Achievements
            </h2>
            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-2xl">{achievement.icon}</span>
                    <h3 className="font-semibold text-gray-800">{achievement.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                  <p className="text-xs text-primary font-semibold">{achievement.users} users earned this</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Community Stats */}
        <div className="mt-16 bg-gradient-to-r from-primary to-secondary p-12 rounded-2xl text-white text-center">
          <h2 className="text-3xl font-bold mb-8">🌍 Global Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl font-bold mb-2">12,450</div>
              <div className="text-lg opacity-90">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">89,234</div>
              <div className="text-lg opacity-90">Activities Completed</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">156</div>
              <div className="text-lg opacity-90">Countries</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">2.3M</div>
              <div className="text-lg opacity-90">CO₂ Saved (kg)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;