import * as express from 'express';
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');
const User = require('../modules/User');
const jwt = require('jsonwebtoken');
const config = require('config');

const { Router } = require('express');
const router = Router();

router.post(
  '/register',
  [
    check('email', 'Wrong email format').isEmail(),
    check('password', 'Pass should have min 6 characters').isLength({ min: 6 })
  ],
  async (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const err = validationResult(req);

      if (!err.isEmpty()) {
        return res
          .status(400)
          .json({ errors: err.array(), message: 'Uncorrected data' });
      }

      const { email, password } = req.body;
      const candidate = await User.findOne({ email });

      if (candidate) {
        res.status(400).json({ message: 'User with this email already exist' });
      }

      const hashedPass = await bcrypt.hash(password, 12);
      const user = new User({ email, password: hashedPass });
      await user.save();

      res.status(201).json({ message: 'User has been created' });
    } catch (e) {
      res.status(500).json({ message: 'Something went wrong' });
      console.log(e);
    }
  }
);

router.post(
  '/login',
  [
    check('email', 'Enter correct email').normalizeEmail().isEmail(),
    check('password', 'Enter your password').exists()
  ],
  async (req: express.Request, res: express.Response) => {
    try {
      const err = validationResult(req);

      if (!err.isEmpty()) {
        return res.status(400).json({
          errors: err.array(),
          message: 'Uncorrected data during the login'
        });
      }

      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: 'No user' });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: 'Incorrect password' });
      }

      const token = jwt.sing({ userId: user.id }, config.get('jwtSecret'), {
        expiresIn: '1h'
      });

      res.json({ token, userId: user.id });
    } catch (e) {
      res.status(500).json({ message: 'Something went wrong' });
      console.error(e);
    }
  }
);

module.exports = router;
