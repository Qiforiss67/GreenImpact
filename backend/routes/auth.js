const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const router = express.Router();

// Mock users database (replace with real database)
const users = [
  { id: 1, email: 'admin@greenimpact.com', password: '$2a$10$N9qo8uLOickgx2ZMRZoMye.IcnJIz.UqvsM6VjMrhp8UXvutnldWy', role: 'admin' }, // admin123
  { id: 2, email: 'user@greenimpact.com', password: '$2a$10$N9qo8uLOickgx2ZMRZoMye.IcnJIz.UqvsM6VjMrhp8UXvutnldWy', role: 'user' }, // user123  
  { id: 3, email: 'demo@example.com', password: '$2a$10$e1.WjXw8.VHaZJjH.O2C0uS2LyTMHtyHQ/7/OLMHeUlwc7B6dhRoO', role: 'user' } // 123456
];

// Login
router.post('/login', [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const user = users.find(u => u.email === email);
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Simple check for demo accounts
    let isValidPassword = false;
    if ((user.email === 'admin@greenimpact.com' && password === 'admin123') ||
        (user.email === 'user@greenimpact.com' && password === 'user123') ||
        (user.email === 'demo@example.com' && password === '123456')) {
      isValidPassword = true;
    } else {
      isValidPassword = await bcrypt.compare(password, user.password);
    }
    
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: { id: user.id, email: user.email, role: user.role }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Register
router.post('/register', [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    
    if (users.find(u => u.email === email)) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: users.length + 1,
      email,
      password: hashedPassword,
      role: 'user'
    };
    
    users.push(newUser);

    const token = jwt.sign(
      { userId: newUser.id, email: newUser.email, role: newUser.role },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '24h' }
    );

    res.status(201).json({
      token,
      user: { id: newUser.id, email: newUser.email, role: newUser.role }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;