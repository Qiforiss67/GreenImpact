const express = require('express');
const { body, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Activity = require('../models/Activity');
const router = express.Router();

// Get all activities
router.get('/', async (req, res) => {
  try {
    const { category, difficulty } = req.query;
    let filter = {};

    if (category && category !== 'all') {
      filter.category = category;
    }
    
    if (difficulty && difficulty !== 'all') {
      filter.difficulty = difficulty;
    }

    const activities = await Activity.find(filter).populate('createdBy', 'email').sort({ createdAt: -1 });
    res.json(activities);
  } catch (error) {
    console.error('Get activities error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get activity by ID
router.get('/:id', async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id).populate('createdBy', 'email');
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    res.json(activity);
  } catch (error) {
    console.error('Get activity error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create activity (protected)
router.post('/', auth, [
  body('title').notEmpty().trim(),
  body('category').isIn(['environment', 'social', 'education', 'economic']),
  body('difficulty').isIn(['easy', 'medium', 'hard']),
  body('points').isInt({ min: 1 }),
  body('sdg').isInt({ min: 1, max: 17 }),
  body('description').notEmpty().trim()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const newActivity = new Activity({
      ...req.body,
      createdBy: req.user.userId
    });

    await newActivity.save();
    await newActivity.populate('createdBy', 'email');
    
    res.status(201).json(newActivity);
  } catch (error) {
    console.error('Create activity error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update activity (protected)
router.put('/:id', auth, [
  body('title').optional().notEmpty().trim(),
  body('category').optional().isIn(['environment', 'social', 'education', 'economic']),
  body('difficulty').optional().isIn(['easy', 'medium', 'hard']),
  body('points').optional().isInt({ min: 1 }),
  body('sdg').optional().isInt({ min: 1, max: 17 }),
  body('description').optional().notEmpty().trim()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const activity = await Activity.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('createdBy', 'email');

    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }

    res.json(activity);
  } catch (error) {
    console.error('Update activity error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete activity (protected)
router.delete('/:id', auth, async (req, res) => {
  try {
    const activity = await Activity.findByIdAndDelete(req.params.id);
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    res.json({ message: 'Activity deleted successfully' });
  } catch (error) {
    console.error('Delete activity error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;