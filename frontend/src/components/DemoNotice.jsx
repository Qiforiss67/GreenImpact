import React from 'react';
import { useApp } from '../context/AppContext';

const DemoNotice = () => {
  const { state } = useApp();
  
  // Only show for demo account
  if (!state.user || state.user.email !== 'demo@example.com') {
    return null;
  }

  return (
    <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <span className="text-yellow-500 text-xl">⚠️</span>
        </div>
        <div className="ml-3">
          <p className="text-sm text-yellow-700">
            <strong>Demo Mode:</strong> Using mock authentication and sample data.
            <br />
            <span className="text-xs">
              This is a demonstration version with pre-loaded content.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DemoNotice;