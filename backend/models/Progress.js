const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  points: {
    type: Number,
    default: 0
  },
  completedActivities: [{
    activityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Activity'
    },
    completedAt: {
      type: Date,
      default: Date.now
    },
    pointsEarned: {
      type: Number,
      required: true
    }
  }],
  achievements: [{
    type: String
  }],
  level: {
    type: String,
    default: 'Beginner'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Progress', progressSchema);