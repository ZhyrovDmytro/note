import * as express from 'express';

const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  if (req.method === 'OPTIONS') {
    next();
  }

  try {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      res.status(401).json({ message: 'Not authorized' });
    }

    req.headers.userId = jwt.verify(token, config.get('jwtSecret'));
    next();
  } catch (e) {
    console.error(e);
    res.status(401).json({ message: 'Not authorized' });
  }
};
