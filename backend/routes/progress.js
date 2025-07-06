const express = require('express');
const auth = require('../middleware/auth');
const Progress = require('../models/Progress');
const Activity = require('../models/Activity');
const User = require('../models/User');
const router = express.Router();

// Get user progress
router.get('/', auth, async (req, res) => {
  try {
    let progress = await Progress.findOne({ userId: req.user.userId })
      .populate('completedActivities.activityId', 'title points sdg');
    
    if (!progress) {
      progress = new Progress({
        userId: req.user.userId,
        points: 0,
        completedActivities: [],
        achievements: [],
        level: 'Beginner'
      });
      await progress.save();
    }

    res.json({
      points: progress.points,
      completedActivities: progress.completedActivities.map(ca => ca.activityId._id),
      achievements: progress.achievements,
      level: progress.level
    });
  } catch (error) {
    console.error('Get progress error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Complete activity
router.post('/complete/:activityId', auth, async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.activityId);
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }

    let progress = await Progress.findOne({ userId: req.user.userId });
    if (!progress) {
      progress = new Progress({ userId: req.user.userId });
    }

    // Check if already completed
    const alreadyCompleted = progress.completedActivities.some(
      ca => ca.activityId.toString() === req.params.activityId
    );

    if (alreadyCompleted) {
      return res.status(400).json({ error: 'Activity already completed' });
    }

    // Add completed activity
    progress.completedActivities.push({
      activityId: activity._id,
      pointsEarned: activity.points
    });
    progress.points += activity.points;

    // Update level
    if (progress.points >= 100) progress.level = 'Planet Protector';
    else if (progress.points >= 50) progress.level = 'SDG Champion';
    else if (progress.points >= 25) progress.level = 'Eco Warrior';

    // Check achievements
    const newAchievements = [];
    if (progress.completedActivities.length >= 1 && !progress.achievements.includes('first-steps')) {
      newAchievements.push('first-steps');
      progress.achievements.push('first-steps');
    }
    if (progress.points >= 50 && !progress.achievements.includes('eco-warrior')) {
      newAchievements.push('eco-warrior');
      progress.achievements.push('eco-warrior');
    }
    if (progress.completedActivities.length >= 10 && !progress.achievements.includes('sdg-champion')) {
      newAchievements.push('sdg-champion');
      progress.achievements.push('sdg-champion');
    }
    if (progress.points >= 100 && !progress.achievements.includes('planet-protector')) {
      newAchievements.push('planet-protector');
      progress.achievements.push('planet-protector');
    }

    await progress.save();

    res.json({
      progress: {
        points: progress.points,
        completedActivities: progress.completedActivities.map(ca => ca.activityId),
        achievements: progress.achievements,
        level: progress.level
      },
      newAchievements
    });
  } catch (error) {
    console.error('Complete activity error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get leaderboard
router.get('/leaderboard', async (req, res) => {
  try {
    const leaderboard = await Progress.find()
      .populate('userId', 'email')
      .sort({ points: -1 })
      .limit(10);

    const formattedLeaderboard = leaderboard.map((progress, index) => ({
      rank: index + 1,
      email: progress.userId.email,
      points: progress.points,
      completedActivities: progress.completedActivities.length,
      level: progress.level
    }));

    res.json(formattedLeaderboard);
  } catch (error) {
    console.error('Get leaderboard error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;