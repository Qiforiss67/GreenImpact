const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

// Mock user progress database
const userProgress = new Map();

// Get user progress
router.get('/', auth, (req, res) => {
  const userId = req.user.userId;
  const progress = userProgress.get(userId) || {
    points: 0,
    completedActivities: [],
    achievements: [],
    level: 'Beginner'
  };
  
  res.json(progress);
});

// Complete activity
router.post('/complete/:activityId', auth, (req, res) => {
  const userId = req.user.userId;
  const activityId = parseInt(req.params.activityId);
  const { points } = req.body;

  let progress = userProgress.get(userId) || {
    points: 0,
    completedActivities: [],
    achievements: [],
    level: 'Beginner'
  };

  // Check if already completed
  if (progress.completedActivities.includes(activityId)) {
    return res.status(400).json({ error: 'Activity already completed' });
  }

  // Update progress
  progress.completedActivities.push(activityId);
  progress.points += points || 10;

  // Update level based on points
  if (progress.points >= 100) progress.level = 'Planet Protector';
  else if (progress.points >= 50) progress.level = 'SDG Champion';
  else if (progress.points >= 25) progress.level = 'Eco Warrior';

  // Check for achievements
  const newAchievements = [];
  if (progress.completedActivities.length >= 5 && !progress.achievements.includes('first-five')) {
    newAchievements.push('first-five');
    progress.achievements.push('first-five');
  }
  if (progress.points >= 50 && !progress.achievements.includes('point-master')) {
    newAchievements.push('point-master');
    progress.achievements.push('point-master');
  }

  userProgress.set(userId, progress);

  res.json({
    progress,
    newAchievements
  });
});

// Get leaderboard
router.get('/leaderboard', (req, res) => {
  const leaderboard = Array.from(userProgress.entries())
    .map(([userId, progress]) => ({
      userId,
      points: progress.points,
      completedActivities: progress.completedActivities.length,
      level: progress.level
    }))
    .sort((a, b) => b.points - a.points)
    .slice(0, 10);

  res.json(leaderboard);
});

module.exports = router;