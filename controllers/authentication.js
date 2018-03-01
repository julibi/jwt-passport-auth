const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  // "sub" means subject, like whosit about
  // "iat" issued at timestamp
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = function(req, res, next) {
  res.send({ token: tokenForUser(req.user) });
}

exports.signup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  
  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide email and password.' });
  }

  // see if a user with the given email exists
  User.findOne({ email: email }, (err, existingUser) => {
    if (err) { return next(err); } 
    // if a user with email does exist, return an error
    if (existingUser) { return res.status(422).send({ error: 'Email is in use'}); }
    // if a user with email does not exist, create and save user record
    // next line just saves the object in memory, not yet in the db
    const user = new User({
      email: email,
      password: password
    });
    // this saves record to db, when it is saved, pass a callback
    user.save((err) => { if (err) { return next(err); } });

    // respond to request
    res.json({ token: tokenForUser(user) });
  });

  
  




}
