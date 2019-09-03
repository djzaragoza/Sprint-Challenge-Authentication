const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets');

const Users = require('./auth-model');

module.exports = (req, res, next) => {
  const tokenHeader = req.headers.authorization;

  if(tokenHeader) {
    const tokenHeader = req.headers.authorization;

    if(tokenHeader) {
      const tokenStrings = tokenHeader.split(" ");

      if(tokenStrings[0].toUpperCase() === 'BEARER' && tokenStrings[1]) {
        jwt.verify(tokenStrings[1], secrets.jwtSecret, (err, decodedToken) => {
          
          if(err) {
            res.status(401).json({ message: 'error verifying token', error: err });
          } else {
            req.decodedToken = decodedToken;
            next();
          }
        });
      } else {
        res.status(401).json({ message: 'invalid scheme, or no token after scheme name.'});
      }
    } else {
      res.status(401).json({ message: 'missing Authorization header'});
  }
};