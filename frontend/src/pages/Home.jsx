import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import DemoNotice from '../components/DemoNotice';

const Home = () => {
  const { state } = useApp();

  const sdgGoals = [
    { id: 1, title: 'No Poverty', icon: '🏠', color: '#e5243b' },
    { id: 2, title: 'Zero Hunger', icon: '🌾', color: '#dda63a' },
    { id: 3, title: 'Good Health', icon: '❤️', color: '#4c9f38' },
    { id: 6, title: 'Clean Water', icon: '💧', color: '#26bde2' },
    { id: 7, title: 'Clean Energy', icon: '⚡', color: '#fcc30b' },
    { id: 13, title: 'Climate Action', icon: '🌍', color: '#3f7e44' }
  ];

  return (
    <div className="bg-gradient-to-br from-green-50 to-blue-50">
      <DemoNotice />
      <section className="relative text-center py-20 bg-gradient-to-r from-primary to-secondary text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-8">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full border border-white/30 mr-4">
              <span className="text-6xl">🌍</span>
            </div>
            <div className="text-left">
              <h1 className="text-6xl font-bold animate-fade-in">
                GreenImpact
              </h1>
              <p className="text-2xl opacity-90">Track Your Impact on SDGs</p>
            </div>
          </div>
          <p className="text-2xl mb-8 opacity-90">
            Join the movement towards sustainable development goals
          </p>
          {!state.user && (
            <Link 
              to="/login" 
              className="bg-white text-primary px-10 py-4 rounded-full text-xl font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 inline-block shadow-lg"
            >
              🚀 Get Started
            </Link>
          )}
        </div>
        <div className="absolute -bottom-1 left-0 right-0">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-16">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="rgb(248, 250, 252)"></path>
          </svg>
        </div>
      </section>

      <section className="py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Featured SDG Goals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sdgGoals.map((goal, index) => (
              <div 
                key={goal.id} 
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 text-center group"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div 
                  className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-2xl font-bold group-hover:scale-110 transition-transform"
                  style={{backgroundColor: goal.color}}
                >
                  {goal.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 group-hover:text-primary transition-colors">{goal.title}</h3>
                <div className="mt-4 h-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent group-hover:via-primary transition-colors"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {state.user && (
        <section className="py-16 px-8 bg-gradient-to-r from-primary to-secondary">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-12 text-white">🎯 Your Impact Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/10 backdrop-blur-sm text-white p-10 rounded-2xl border border-white/20 hover:bg-white/20 transition-all">
                <div className="text-5xl font-bold mb-2">⭐ {state.userProgress.points}</div>
                <p className="text-xl opacity-90">Points Earned</p>
                <div className="mt-4 bg-white/20 rounded-full h-2">
                  <div className="bg-white rounded-full h-2" style={{width: `${Math.min(state.userProgress.points, 100)}%`}}></div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm text-white p-10 rounded-2xl border border-white/20 hover:bg-white/20 transition-all">
                <div className="text-5xl font-bold mb-2">🏆 {state.userProgress.completedActivities.length}</div>
                <p className="text-xl opacity-90">Activities Completed</p>
                <div className="mt-4 bg-white/20 rounded-full h-2">
                  <div className="bg-white rounded-full h-2" style={{width: `${Math.min(state.userProgress.completedActivities.length * 20, 100)}%`}}></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;