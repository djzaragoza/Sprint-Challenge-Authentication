const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secrets = require('./config/secrets');

const Users = require('./auth-model');

router.post('/register', (req, res) => {
   // implement registration
   let user = req.body;
   const hash = bcrypt.hashSync(user.password, 10);
   user.password = hash;

   Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});
 

router.post('/login', (req, res) => {
  // implement login
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if(user && bcrypt.compareSync(password, user.password)) {
        const token = genToken(user);
        res.status(200).json({ 
          message: `Welcome ${user.username}!`,
          token
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials '});
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

//JWT middleware

function genToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  };

  const secret = secrets.jwtSecret;

  const options = {
    expiresIn: '1h'
  };

  return jwt.sign(payload, secret, options);
}

module.exports = router;