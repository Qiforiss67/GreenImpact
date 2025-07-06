import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import DemoNotice from '../components/DemoNotice';

const Home = () => {
  const { state } = useApp();
  const [currentSDG, setCurrentSDG] = useState(0);
  
  const sdgGoals = [
    { id: 1, title: 'No Poverty', icon: '🏠', color: 'from-red-500 to-red-600' },
    { id: 2, title: 'Zero Hunger', icon: '🌾', color: 'from-yellow-500 to-yellow-600' },
    { id: 3, title: 'Good Health', icon: '❤️', color: 'from-green-500 to-green-600' },
    { id: 6, title: 'Clean Water', icon: '💧', color: 'from-blue-500 to-blue-600' },
    { id: 7, title: 'Clean Energy', icon: '⚡', color: 'from-yellow-400 to-orange-500' },
    { id: 13, title: 'Climate Action', icon: '🌍', color: 'from-green-400 to-blue-500' }
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSDG((prev) => (prev + 1) % sdgGoals.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 min-h-screen">
      <DemoNotice />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary via-secondary to-purple-600 text-white py-24 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-white/10 rounded-full animate-bounce"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white/10 rounded-full animate-ping"></div>
          <div className="absolute bottom-32 right-1/3 w-8 h-8 bg-white/10 rounded-full animate-pulse"></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-8 text-center relative z-10">
          <div className="flex flex-col sm:flex-row items-center justify-center mb-8">
            <div className="bg-white/20 backdrop-blur-sm p-4 sm:p-6 rounded-full border border-white/30 mb-4 sm:mb-0 sm:mr-6 animate-float">
              <span className="text-5xl sm:text-7xl">{sdgGoals[currentSDG].icon}</span>
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold animate-fade-in bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                GreenImpact
              </h1>
              <p className="text-xl sm:text-2xl lg:text-3xl opacity-90 animate-slide-up">{sdgGoals[currentSDG].title}</p>
            </div>
          </div>
          
          <p className="text-lg sm:text-xl lg:text-2xl mb-10 max-w-4xl mx-auto leading-relaxed opacity-95 animate-fade-in-delay px-4">
            🌟 Join thousands of changemakers working towards the UN's 17 Sustainable Development Goals. 
            Track your progress, earn achievements, and make a real difference in the world.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-slide-up-delay">
            {state.user ? (
              state.user.role === 'admin' ? (
                <Link 
                  to="/admin" 
                  className="group bg-white text-primary hover:bg-gray-100 px-10 py-5 rounded-full transition-all transform hover:scale-110 font-bold text-xl shadow-2xl hover:shadow-3xl"
                >
                  <span className="group-hover:animate-bounce inline-block mr-2">🛠️</span>
                  Admin Dashboard
                </Link>
              ) : (
                <Link 
                  to="/activities" 
                  className="group bg-white text-primary hover:bg-gray-100 px-10 py-5 rounded-full transition-all transform hover:scale-110 font-bold text-xl shadow-2xl hover:shadow-3xl"
                >
                  <span className="group-hover:animate-bounce inline-block mr-2">🎯</span>
                  Explore Activities
                </Link>
              )
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="group bg-white text-primary hover:bg-gray-100 px-10 py-5 rounded-full transition-all transform hover:scale-110 font-bold text-xl shadow-2xl hover:shadow-3xl"
                >
                  <span className="group-hover:animate-bounce inline-block mr-2">🚀</span>
                  Get Started
                </Link>
                <Link 
                  to="/about" 
                  className="group bg-white/20 backdrop-blur-sm hover:bg-white/30 px-10 py-5 rounded-full transition-all transform hover:scale-110 font-bold text-xl border-2 border-white/40 hover:border-white/60"
                >
                  <span className="group-hover:animate-bounce inline-block mr-2">📖</span>
                  Learn More
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6">🌟 Why Choose GreenImpact?</h2>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4">
              Our platform makes it easy and engaging to contribute to sustainable development goals
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              {
                icon: '🎯',
                title: 'Goal-Oriented Activities',
                description: 'Participate in activities directly aligned with UN SDGs and track your meaningful contributions',
                color: 'from-blue-500 to-purple-600'
              },
              {
                icon: '🏆',
                title: 'Achievement System', 
                description: 'Earn points, unlock badges, and climb leaderboards as you make positive environmental impact',
                color: 'from-yellow-500 to-orange-600'
              },
              {
                icon: '👥',
                title: 'Community Impact',
                description: 'Join a global community of changemakers and see collective progress towards sustainability',
                color: 'from-green-500 to-teal-600'
              }
            ].map((feature, index) => (
              <div key={index} className="group">
                <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border border-gray-100">
                  <div className={`bg-gradient-to-br ${feature.color} text-white w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-8 text-4xl group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-center text-lg">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SDG Goals Preview */}
      <div className="py-24 bg-gradient-to-br from-blue-50 via-green-50 to-purple-50 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full" style={{backgroundImage: 'radial-gradient(circle at 25% 25%, #10b981 0%, transparent 50%), radial-gradient(circle at 75% 75%, #3b82f6 0%, transparent 50%)'}}></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-6">🌍 Sustainable Development Goals</h2>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4">
              Contribute to the UN's 17 goals for a better world by 2030
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 lg:gap-8">
            {[
              { id: 1, title: 'No Poverty', color: 'from-red-500 to-red-600', icon: '🏠' },
              { id: 2, title: 'Zero Hunger', color: 'from-yellow-500 to-yellow-600', icon: '🌾' },
              { id: 3, title: 'Good Health', color: 'from-green-500 to-green-600', icon: '❤️' },
              { id: 6, title: 'Clean Water', color: 'from-blue-500 to-blue-600', icon: '💧' },
              { id: 7, title: 'Clean Energy', color: 'from-yellow-400 to-orange-500', icon: '⚡' },
              { id: 13, title: 'Climate Action', color: 'from-green-600 to-green-700', icon: '🌍' }
            ].map((goal, index) => (
              <div 
                key={goal.id} 
                className={`group bg-gradient-to-br ${goal.color} text-white p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl text-center hover:transform hover:scale-110 transition-all duration-500 shadow-xl hover:shadow-2xl cursor-pointer`}
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="text-2xl sm:text-3xl lg:text-4xl mb-2 sm:mb-4 group-hover:animate-bounce">{goal.icon}</div>
                <div className="text-sm sm:text-base lg:text-lg font-bold mb-1 sm:mb-2">SDG {goal.id}</div>
                <div className="text-xs sm:text-sm font-medium opacity-90">{goal.title}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* User Dashboard */}
      {state.user && (
        <div className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
          <div className="max-w-6xl mx-auto px-8">
            <h2 className="text-4xl font-bold text-center mb-12">🎯 Your Impact Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 text-center">
                <div className="text-5xl font-bold mb-2">⭐ {state.userProgress.points}</div>
                <p className="text-xl opacity-90">Points Earned</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 text-center">
                <div className="text-5xl font-bold mb-2">🏆 {state.userProgress.completedActivities.length}</div>
                <p className="text-xl opacity-90">Activities Completed</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 text-center">
                <div className="text-5xl font-bold mb-2">🌟 {state.userProgress.achievements?.length || 0}</div>
                <p className="text-xl opacity-90">Achievements Unlocked</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Call to Action */}
      <div className="py-24 bg-gradient-to-r from-primary via-secondary to-purple-600 text-white relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="animate-pulse absolute top-10 left-10 w-32 h-32 bg-white rounded-full"></div>
            <div className="animate-bounce absolute top-20 right-20 w-24 h-24 bg-white rounded-full"></div>
            <div className="animate-ping absolute bottom-20 left-1/4 w-16 h-16 bg-white rounded-full"></div>
          </div>
        </div>
        
        <div className="max-w-5xl mx-auto px-4 sm:px-8 text-center relative z-10">
          <div className="mb-8">
            <span className="text-6xl sm:text-8xl animate-bounce inline-block">🚀</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-8 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
            Ready to Make an Impact?
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl mb-12 opacity-95 max-w-3xl mx-auto leading-relaxed px-4">
            Join our community today and start your journey towards a more sustainable future. 
            Every action counts, every goal matters! 🌟
          </p>
          
          {!state.user && (
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link 
                to="/login" 
                className="group bg-white text-primary hover:bg-gray-100 px-8 sm:px-12 py-4 sm:py-6 rounded-full transition-all transform hover:scale-110 font-bold text-lg sm:text-xl lg:text-2xl shadow-2xl hover:shadow-3xl inline-block"
              >
                <span className="group-hover:animate-spin inline-block mr-3">🌟</span>
                Start Your Journey
              </Link>
              <Link 
                to="/about" 
                className="group bg-white/20 backdrop-blur-sm hover:bg-white/30 px-8 sm:px-12 py-4 sm:py-6 rounded-full transition-all transform hover:scale-110 font-bold text-lg sm:text-xl lg:text-2xl border-2 border-white/40 hover:border-white/60"
              >
                <span className="group-hover:animate-bounce inline-block mr-3">💡</span>
                Learn More
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;