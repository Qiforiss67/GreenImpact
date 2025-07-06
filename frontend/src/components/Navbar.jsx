import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import ConfirmModal from './ConfirmModal';

const Navbar = () => {
  const { state, actions } = useApp();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    actions.logout();
    navigate('/');
    setShowLogoutModal(false);
  };

  return (
    <>
      <nav className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 shadow-lg backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 hover:text-gray-200 transition-all transform hover:scale-105">
            <div className="bg-white/20 backdrop-blur-sm p-2 rounded-full border border-white/30">
              <span className="text-2xl">🌍</span>
            </div>
            <div>
              <div className="text-2xl font-bold">GreenImpact</div>
              <div className="text-xs opacity-75">SDG Platform</div>
            </div>
          </Link>
          <div className="flex items-center space-x-8">
            {state.user?.role === 'admin' ? (
              <>
                <Link to="/admin" className="hover:text-gray-200 transition-all hover:scale-105 font-medium">
                  🛠️ Dashboard
                </Link>
                <Link to="/community" className="hover:text-gray-200 transition-all hover:scale-105 font-medium">
                  👥 Community
                </Link>
                <Link to="/about" className="hover:text-gray-200 transition-all hover:scale-105 font-medium">
                  🌍 About
                </Link>
              </>
            ) : (
              <>
                <Link to="/activities" className="hover:text-gray-200 transition-all hover:scale-105 font-medium">
                  🎯 Activities
                </Link>
                <Link to="/progress" className="hover:text-gray-200 transition-all hover:scale-105 font-medium">
                  📈 Progress
                </Link>
                <Link to="/community" className="hover:text-gray-200 transition-all hover:scale-105 font-medium">
                  👥 Community
                </Link>
                <Link to="/about" className="hover:text-gray-200 transition-all hover:scale-105 font-medium">
                  🌍 About
                </Link>
                {state.user && (
                  <Link to="/manage" className="hover:text-gray-200 transition-all hover:scale-105 font-medium">
                    📊 My Progress
                  </Link>
                )}
              </>
            )}
            {state.user ? (
              <div className="flex items-center space-x-4">
                {state.user.role !== 'admin' && (
                  <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold border border-white/30">
                    ⭐ {state.userProgress.points}
                  </span>
                )}
                <button 
                  onClick={handleLogout}
                  className="bg-white/20 backdrop-blur-sm hover:bg-white/30 px-6 py-2 rounded-full transition-all transform hover:scale-105 font-semibold border border-white/30"
                >
                  🚪 Logout
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="bg-white text-primary hover:bg-gray-100 px-6 py-2 rounded-full transition-all transform hover:scale-105 font-semibold shadow-lg"
              >
                🔑 Login
              </Link>
            )}
          </div>
        </div>
      </nav>
      
      <ConfirmModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={confirmLogout}
        title="Logout Confirmation"
        message="Are you sure you want to logout? You will need to login again to access your account."
        confirmText="Logout"
        cancelText="Stay Logged In"
        type="warning"
      />
    </>
  );
};

export default Navbar;