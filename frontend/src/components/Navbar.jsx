import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import ConfirmModal from './ConfirmModal';

const Navbar = () => {
  const { state, actions } = useApp();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      <nav className="bg-gradient-to-r from-primary to-secondary text-white px-4 sm:px-8 py-4 shadow-lg backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 hover:text-gray-200 transition-all transform hover:scale-105">
            <div className="bg-white/20 backdrop-blur-sm p-1 sm:p-2 rounded-full border border-white/30">
              <span className="text-xl sm:text-2xl">🌍</span>
            </div>
            <div>
              <div className="text-lg sm:text-2xl font-bold">GreenImpact</div>
              <div className="text-xs opacity-75 hidden sm:block">SDG Platform</div>
            </div>
          </Link>
          
          {/* Mobile menu button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md hover:bg-white/20 transition-colors"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${mobileMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></span>
              <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${mobileMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
            </div>
          </button>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {state.user?.role === 'admin' ? (
              <>
                <Link to="/admin" className="hover:text-gray-200 transition-all hover:scale-105 font-medium text-sm lg:text-base">
                  🛠️ Dashboard
                </Link>
                <Link to="/community" className="hover:text-gray-200 transition-all hover:scale-105 font-medium text-sm lg:text-base">
                  👥 Community
                </Link>
                <Link to="/about" className="hover:text-gray-200 transition-all hover:scale-105 font-medium text-sm lg:text-base">
                  🌍 About
                </Link>
              </>
            ) : (
              <>
                <Link to="/activities" className="hover:text-gray-200 transition-all hover:scale-105 font-medium text-sm lg:text-base">
                  🎯 Activities
                </Link>
                <Link to="/progress" className="hover:text-gray-200 transition-all hover:scale-105 font-medium text-sm lg:text-base">
                  📈 Progress
                </Link>
                <Link to="/community" className="hover:text-gray-200 transition-all hover:scale-105 font-medium text-sm lg:text-base">
                  👥 Community
                </Link>
                <Link to="/about" className="hover:text-gray-200 transition-all hover:scale-105 font-medium text-sm lg:text-base">
                  🌍 About
                </Link>
                {state.user && (
                  <Link to="/manage" className="hover:text-gray-200 transition-all hover:scale-105 font-medium text-sm lg:text-base">
                    📊 My Progress
                  </Link>
                )}
              </>
            )}
            {state.user ? (
              <div className="flex items-center space-x-2 lg:space-x-4">
                {state.user.role !== 'admin' && (
                  <span className="bg-white/20 backdrop-blur-sm px-2 lg:px-4 py-1 lg:py-2 rounded-full text-xs lg:text-sm font-semibold border border-white/30">
                    ⭐ {state.userProgress.points}
                  </span>
                )}
                <button 
                  onClick={handleLogout}
                  className="bg-white/20 backdrop-blur-sm hover:bg-white/30 px-3 lg:px-6 py-1 lg:py-2 rounded-full transition-all transform hover:scale-105 font-semibold border border-white/30 text-xs lg:text-sm"
                >
                  🚪 Logout
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="bg-white text-primary hover:bg-gray-100 px-4 lg:px-6 py-1 lg:py-2 rounded-full transition-all transform hover:scale-105 font-semibold shadow-lg text-xs lg:text-sm"
              >
                🔑 Login
              </Link>
            )}
          </div>
        </div>
        
        {/* Mobile menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
          <div className="px-4 pt-4 pb-6 space-y-3 border-t border-white/20 mt-4">
            {state.user?.role === 'admin' ? (
              <>
                <Link to="/admin" className="block py-2 hover:text-gray-200 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                  🛠️ Dashboard
                </Link>
                <Link to="/community" className="block py-2 hover:text-gray-200 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                  👥 Community
                </Link>
                <Link to="/about" className="block py-2 hover:text-gray-200 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                  🌍 About
                </Link>
              </>
            ) : (
              <>
                <Link to="/activities" className="block py-2 hover:text-gray-200 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                  🎯 Activities
                </Link>
                <Link to="/progress" className="block py-2 hover:text-gray-200 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                  📈 Progress
                </Link>
                <Link to="/community" className="block py-2 hover:text-gray-200 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                  👥 Community
                </Link>
                <Link to="/about" className="block py-2 hover:text-gray-200 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                  🌍 About
                </Link>
                {state.user && (
                  <Link to="/manage" className="block py-2 hover:text-gray-200 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                    📊 My Progress
                  </Link>
                )}
              </>
            )}
            
            {state.user ? (
              <div className="pt-4 border-t border-white/20">
                {state.user.role !== 'admin' && (
                  <div className="mb-3">
                    <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold border border-white/30">
                      ⭐ {state.userProgress.points} Points
                    </span>
                  </div>
                )}
                <button 
                  onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                  className="w-full bg-white/20 backdrop-blur-sm hover:bg-white/30 px-4 py-2 rounded-full transition-all font-semibold border border-white/30 text-left"
                >
                  🚪 Logout
                </button>
              </div>
            ) : (
              <div className="pt-4 border-t border-white/20">
                <Link 
                  to="/login" 
                  className="block w-full bg-white text-primary hover:bg-gray-100 px-4 py-2 rounded-full transition-all font-semibold shadow-lg text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  🔑 Login
                </Link>
              </div>
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