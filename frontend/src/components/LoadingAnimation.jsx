import React from 'react';

const LoadingAnimation = ({ message = "Loading..." }) => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center z-50">
      <div className="text-center">
        {/* Bouncing Dots */}
        <div className="flex space-x-2 mb-8">
          <div className="w-4 h-4 bg-green-500 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
          <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
          <div className="w-4 h-4 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
        </div>
        
        {/* Pulsing Icon */}
        <div className="mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto animate-pulse">
            <span className="text-2xl text-white">🌱</span>
          </div>
        </div>
        
        {/* Loading Text */}
        <div className="text-lg font-semibold text-gray-700 mb-2">{message}</div>
        
        {/* Progress Bar */}
        <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-pulse"></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-8 h-8 bg-green-200 rounded-full animate-ping opacity-75"></div>
        <div className="absolute top-32 right-32 w-6 h-6 bg-blue-200 rounded-full animate-ping opacity-75" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-40 left-40 w-4 h-4 bg-purple-200 rounded-full animate-ping opacity-75" style={{animationDelay: '2s'}}></div>
      </div>
    </div>
  );
};

export default LoadingAnimation;