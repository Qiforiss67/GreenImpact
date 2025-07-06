const mongoose = require('mongoose');
const User = require('../models/User');
const Activity = require('../models/Activity');
require('dotenv').config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/greenimpact');
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Activity.deleteMany({});
    console.log('Cleared existing data');

    // Create admin user
    const admin = new User({
      email: 'admin@greenimpact.com',
      password: 'admin123',
      role: 'admin'
    });
    await admin.save();

    // Create regular users
    const user1 = new User({
      email: 'user@greenimpact.com',
      password: 'user123',
      role: 'user'
    });
    await user1.save();

    const user2 = new User({
      email: 'demo@example.com',
      password: '123456',
      role: 'user'
    });
    await user2.save();

    console.log('Users created');

    // Create sample activities
    const activities = [
      {
        title: 'Plant a Tree',
        description: 'Plant a tree in your community to help combat climate change',
        category: 'environment',
        difficulty: 'easy',
        points: 10,
        sdg: 13,
        createdBy: admin._id
      },
      {
        title: 'Reduce Water Usage',
        description: 'Track and reduce your daily water consumption by 20%',
        category: 'environment',
        difficulty: 'medium',
        points: 15,
        sdg: 6,
        createdBy: admin._id
      },
      {
        title: 'Volunteer at Food Bank',
        description: 'Help distribute food to those in need in your community',
        category: 'social',
        difficulty: 'medium',
        points: 20,
        sdg: 2,
        createdBy: admin._id
      },
      {
        title: 'Use Renewable Energy',
        description: 'Switch your home to solar or wind energy sources',
        category: 'environment',
        difficulty: 'hard',
        points: 25,
        sdg: 7,
        createdBy: admin._id
      },
      {
        title: 'Educate Others on SDGs',
        description: 'Share knowledge about sustainable development with others',
        category: 'education',
        difficulty: 'easy',
        points: 12,
        sdg: 4,
        createdBy: admin._id
      }
    ];

    await Activity.insertMany(activities);
    console.log('Sample activities created');

    console.log('✅ Seed data completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed data error:', error);
    process.exit(1);
  }
};

seedData();