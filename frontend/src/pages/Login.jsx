import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateEmail, validatePassword, sanitizeInput } from '../utils/validation';
import { checkRateLimit } from '../utils/security';
import { useApp } from '../context/AppContext';
import apiService from '../utils/api';
import LoadingAnimation from '../components/LoadingAnimation';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { actions } = useApp();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    const cleanEmail = sanitizeInput(email);
    const cleanPassword = sanitizeInput(password);
    
    if (!validateEmail(cleanEmail)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }
    
    if (!validatePassword(cleanPassword)) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }
    
    if (!checkRateLimit(cleanEmail)) {
      setError('Too many login attempts. Please try again later.');
      setLoading(false);
      return;
    }
    
    try {
      let result;
      if (isLogin) {
        result = await apiService.login(cleanEmail, cleanPassword);
      } else {
        result = await apiService.register(cleanEmail, cleanPassword);
      }
      actions.setUser(result.user);
      navigate('/');
    } catch (error) {
      setError(error.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };
  
  const getFirebaseErrorMessage = (errorCode) => {
    if (typeof errorCode === 'string' && errorCode.includes('Invalid email or password')) {
      return 'Invalid email or password. Try demo accounts above.';
    }
    if (typeof errorCode === 'string' && errorCode.includes('Email already in use')) {
      return 'Email already registered. Try logging in instead.';
    }
    switch (errorCode) {
      case 'auth/user-not-found':
        return 'No account found with this email';
      case 'auth/wrong-password':
        return 'Incorrect password';
      case 'auth/email-already-in-use':
        return 'Email already registered';
      case 'auth/weak-password':
        return 'Password is too weak';
      default:
        return errorCode || 'Authentication failed. Please try again.';
    }
  };

  if (loading) {
    return <LoadingAnimation message={isLogin ? "Signing in..." : "Creating account..."} />;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4 sm:px-8">
      <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6 text-primary">
          {isLogin ? 'Login' : 'Sign Up'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
            required
          />
          
          {error && <p className="text-red-500 text-sm">{error}</p>}
          
          <button 
            type="submit" 
            className="w-full bg-primary text-white py-2 sm:py-3 rounded-md hover:bg-secondary transition-colors text-sm sm:text-base font-medium"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        
        <p className="text-center mt-4">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-primary underline hover:text-secondary"
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
        
        <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="text-xs sm:text-sm font-semibold text-blue-800 mb-2">🔑 Demo Accounts</h3>
          <div className="space-y-2 text-xs text-blue-700">
            {[
              { email: 'admin@greenimpact.com', password: 'admin123' },
              { email: 'user@greenimpact.com', password: 'user123' },
              { email: 'demo@example.com', password: '123456' }
            ].map((account, index) => (
              <div key={index} className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-2 p-2 bg-white rounded border">
                <div className="flex-1 min-w-0">
                  <div className="font-mono text-xs truncate">{account.email}</div>
                  <div className="font-mono text-xs text-gray-600">Pass: {account.password}</div>
                </div>
                <button
                  onClick={() => {
                    setEmail(account.email);
                    setPassword(account.password);
                  }}
                  className="text-blue-600 hover:text-blue-800 underline text-xs font-medium self-start sm:self-auto"
                >
                  Use
                </button>
              </div>
            ))}
          </div>
          <p className="text-xs text-blue-600 mt-2">Click "Use" to auto-fill credentials</p>
        </div>
      </div>
    </div>
  );
};

export default Login;