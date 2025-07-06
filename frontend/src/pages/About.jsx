import React from 'react';

const About = () => {
  return (
    <div className="bg-gradient-to-br from-green-50 to-blue-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-primary mb-6">🌍 About GreenImpact</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Empowering individuals to make a meaningful impact on the world through sustainable development goals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-primary mb-4">🎯 Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              To create a platform where individuals can track their contributions to the UN Sustainable Development Goals, 
              fostering a community of environmentally conscious citizens working together for a better future.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-primary mb-4">🌱 Our Vision</h2>
            <p className="text-gray-600 leading-relaxed">
              A world where every person is aware of their environmental impact and actively participates in 
              sustainable practices, contributing to the achievement of global sustainability goals.
            </p>
          </div>
        </div>

        <div className="bg-white p-12 rounded-2xl shadow-lg mb-16">
          <h2 className="text-3xl font-bold text-center text-primary mb-8">📊 The 17 SDGs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { id: 1, title: 'No Poverty', color: '#e5243b' },
              { id: 2, title: 'Zero Hunger', color: '#dda63a' },
              { id: 3, title: 'Good Health', color: '#4c9f38' },
              { id: 4, title: 'Quality Education', color: '#c5192d' },
              { id: 5, title: 'Gender Equality', color: '#ff3a21' },
              { id: 6, title: 'Clean Water', color: '#26bde2' },
              { id: 7, title: 'Clean Energy', color: '#fcc30b' },
              { id: 8, title: 'Decent Work', color: '#a21942' },
              { id: 9, title: 'Innovation', color: '#fd6925' },
              { id: 10, title: 'Reduced Inequalities', color: '#dd1367' },
              { id: 11, title: 'Sustainable Cities', color: '#fd9d24' },
              { id: 12, title: 'Responsible Consumption', color: '#bf8b2e' },
              { id: 13, title: 'Climate Action', color: '#3f7e44' },
              { id: 14, title: 'Life Below Water', color: '#0a97d9' },
              { id: 15, title: 'Life on Land', color: '#56c02b' },
              { id: 16, title: 'Peace & Justice', color: '#00689d' },
              { id: 17, title: 'Partnerships', color: '#19486a' }
            ].map(sdg => (
              <div 
                key={sdg.id}
                className="p-4 rounded-lg text-white text-center font-semibold text-sm"
                style={{backgroundColor: sdg.color}}
              >
                {sdg.id}. {sdg.title}
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-primary mb-6">🚀 Get Started Today</h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of users making a difference, one activity at a time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;