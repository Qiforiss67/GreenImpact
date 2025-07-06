const express = require('express');
const { body, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const router = express.Router();

// Mock activities database
let activities = [
  { id: 1, title: 'Plant a Tree', category: 'environment', difficulty: 'easy', points: 10, sdg: 13, description: 'Plant a tree in your community', userId: 1 },
  { id: 2, title: 'Reduce Water Usage', category: 'environment', difficulty: 'medium', points: 15, sdg: 6, description: 'Track and reduce daily water consumption', userId: 1 },
  { id: 3, title: 'Volunteer at Food Bank', category: 'social', difficulty: 'medium', points: 20, sdg: 2, description: 'Help distribute food to those in need', userId: 1 },
  { id: 4, title: 'Use Renewable Energy', category: 'environment', difficulty: 'hard', points: 25, sdg: 7, description: 'Switch to solar or wind energy', userId: 1 },
  { id: 5, title: 'Educate Others on SDGs', category: 'education', difficulty: 'easy', points: 12, sdg: 4, description: 'Share knowledge about sustainable development', userId: 1 }
];

// Get all activities
router.get('/', (req, res) => {
  const { category, difficulty } = req.query;
  let filteredActivities = activities;

  if (category && category !== 'all') {
    filteredActivities = filteredActivities.filter(a => a.category === category);
  }
  
  if (difficulty && difficulty !== 'all') {
    filteredActivities = filteredActivities.filter(a => a.difficulty === difficulty);
  }

  res.json(filteredActivities);
});

// Get user's own activities (protected)
router.get('/my-activities', auth, (req, res) => {
  const userActivities = activities.filter(a => a.userId === req.user.userId);
  res.json(userActivities);
});

// Get activity by ID
router.get('/:id', (req, res) => {
  const activity = activities.find(a => a.id === parseInt(req.params.id));
  if (!activity) {
    return res.status(404).json({ error: 'Activity not found' });
  }
  res.json(activity);
});

// Create activity (protected)
router.post('/', auth, [
  body('title').notEmpty().trim(),
  body('category').isIn(['environment', 'social', 'education', 'economic']),
  body('difficulty').isIn(['easy', 'medium', 'hard']),
  body('points').isInt({ min: 1 }),
  body('sdg').isInt({ min: 1, max: 17 }),
  body('description').notEmpty().trim()
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const newActivity = {
    id: activities.length + 1,
    ...req.body,
    userId: req.user.userId
  };

  activities.push(newActivity);
  res.status(201).json(newActivity);
});

// Update activity (protected)
router.put('/:id', auth, [
  body('title').optional().notEmpty().trim(),
  body('category').optional().isIn(['environment', 'social', 'education', 'economic']),
  body('difficulty').optional().isIn(['easy', 'medium', 'hard']),
  body('points').optional().isInt({ min: 1 }),
  body('sdg').optional().isInt({ min: 1, max: 17 }),
  body('description').optional().notEmpty().trim()
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const activityIndex = activities.findIndex(a => a.id === parseInt(req.params.id));
  if (activityIndex === -1) {
    return res.status(404).json({ error: 'Activity not found' });
  }

  activities[activityIndex] = { ...activities[activityIndex], ...req.body };
  res.json(activities[activityIndex]);
});

// Delete activity (protected)
router.delete('/:id', auth, (req, res) => {
  const activityIndex = activities.findIndex(a => a.id === parseInt(req.params.id));
  if (activityIndex === -1) {
    return res.status(404).json({ error: 'Activity not found' });
  }

  const deletedActivity = activities.splice(activityIndex, 1)[0];
  res.json(deletedActivity);
});

module.exports = router;