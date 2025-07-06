import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-primary to-secondary text-white relative overflow-hidden mt-auto">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full" style={{backgroundImage: 'radial-gradient(circle at 20% 20%, #10b981 0%, transparent 50%), radial-gradient(circle at 80% 80%, #3b82f6 0%, transparent 50%)'}}></div>
      </div>
      
      <div className="relative z-10 py-12 sm:py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-br from-green-400 to-blue-500 p-3 sm:p-4 rounded-2xl shadow-lg">
                  <span className="text-2xl sm:text-3xl">🌍</span>
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">GreenImpact</h3>
                  <p className="text-green-200 font-medium text-sm sm:text-base">SDG Platform</p>
                </div>
              </div>
              
              <p className="text-gray-200 leading-relaxed text-base sm:text-lg max-w-md">
                🌱 Empowering individuals and communities to make a positive impact on the world through sustainable development goals. Join our mission for a better tomorrow.
              </p>
              
              {/* Social Links */}
              <div className="flex flex-wrap gap-3 sm:gap-4">
                <a href="#" className="group bg-white/10 hover:bg-white/20 p-3 sm:p-4 rounded-xl transition-all transform hover:scale-110 hover:rotate-6 backdrop-blur-sm border border-white/20">
                  <span className="text-xl sm:text-2xl group-hover:animate-bounce">🐦</span>
                </a>
                <a href="#" className="group bg-white/10 hover:bg-white/20 p-3 sm:p-4 rounded-xl transition-all transform hover:scale-110 hover:rotate-6 backdrop-blur-sm border border-white/20">
                  <span className="text-xl sm:text-2xl group-hover:animate-bounce">📷</span>
                </a>
                <a href="#" className="group bg-white/10 hover:bg-white/20 p-3 sm:p-4 rounded-xl transition-all transform hover:scale-110 hover:rotate-6 backdrop-blur-sm border border-white/20">
                  <span className="text-xl sm:text-2xl group-hover:animate-bounce">💼</span>
                </a>
                <a href="#" className="group bg-white/10 hover:bg-white/20 p-3 sm:p-4 rounded-xl transition-all transform hover:scale-110 hover:rotate-6 backdrop-blur-sm border border-white/20">
                  <span className="text-xl sm:text-2xl group-hover:animate-bounce">🌐</span>
                </a>
              </div>
              
              {/* Newsletter */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/20">
                <h4 className="text-base sm:text-lg font-semibold mb-3 flex items-center">
                  <span className="mr-2">📧</span> Stay Updated
                </h4>
                <p className="text-sm text-gray-200 mb-4">Get the latest SDG updates and impact stories</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="flex-1 px-4 py-2 sm:py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 text-sm sm:text-base"
                  />
                  <button className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-105 text-sm sm:text-base">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
            
            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-lg sm:text-xl font-bold flex items-center">
                <span className="mr-2">🔗</span> Quick Links
              </h4>
              <ul className="space-y-3">
                <li><a href="/activities" className="text-gray-200 hover:text-green-300 transition-colors flex items-center group text-sm sm:text-base">
                  <span className="mr-2 group-hover:animate-bounce">🎯</span> Activities
                </a></li>
                <li><a href="/progress" className="text-gray-200 hover:text-green-300 transition-colors flex items-center group text-sm sm:text-base">
                  <span className="mr-2 group-hover:animate-bounce">📈</span> Progress
                </a></li>
                <li><a href="/community" className="text-gray-200 hover:text-green-300 transition-colors flex items-center group text-sm sm:text-base">
                  <span className="mr-2 group-hover:animate-bounce">👥</span> Community
                </a></li>
                <li><a href="/about" className="text-gray-200 hover:text-green-300 transition-colors flex items-center group text-sm sm:text-base">
                  <span className="mr-2 group-hover:animate-bounce">🌍</span> About
                </a></li>
              </ul>
            </div>
            
            {/* SDG Goals */}
            <div className="space-y-4">
              <h4 className="text-lg sm:text-xl font-bold flex items-center">
                <span className="mr-2">🌍</span> Featured SDGs
              </h4>
              <div className="space-y-3">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20 hover:bg-white/20 transition-all">
                  <span className="text-red-400 font-semibold text-sm">🏠 SDG 1:</span>
                  <p className="text-xs sm:text-sm text-gray-200">No Poverty</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20 hover:bg-white/20 transition-all">
                  <span className="text-yellow-400 font-semibold text-sm">🌾 SDG 2:</span>
                  <p className="text-xs sm:text-sm text-gray-200">Zero Hunger</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20 hover:bg-white/20 transition-all">
                  <span className="text-green-400 font-semibold text-sm">❤️ SDG 3:</span>
                  <p className="text-xs sm:text-sm text-gray-200">Good Health</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20 hover:bg-white/20 transition-all">
                  <span className="text-blue-400 font-semibold text-sm">💧 SDG 6:</span>
                  <p className="text-xs sm:text-sm text-gray-200">Clean Water</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom Section */}
          <div className="border-t border-white/20 mt-8 sm:mt-12 pt-6 sm:pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-200 text-center md:text-left text-sm sm:text-base">
                © 2024 GreenImpact. Made with 💚 for a sustainable future.
              </p>
              <div className="flex items-center space-x-4 sm:space-x-6 text-xs sm:text-sm text-gray-300">
                <a href="#" className="hover:text-green-300 transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-green-300 transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-green-300 transition-colors">Contact</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;