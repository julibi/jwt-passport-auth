const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// Create Local Strategy
const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
  User.findOne({ email: email.toLowerCase() }, function(err, user) {
    if(err) { return done(err); }
    if(!user) { return done(null, false); }
    
    // compare password is 'user.password'? -> decrypt the hashed password …
    user.comparePassword(password, function(err, isMatch) {
      if(err) { return done(err); }
      if(!isMatch) { return done(null, false); }
      
      return done(null, user);
    });
  });
}); 


// Setup Options for JWT Strategy
// tell jwt where to look on the request (header?, url?) for the key
// in this case inside Header called authorization
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

// Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  // See if the user ID in the payload exists in our database
  // If it does, call 'done' with that other 
  // otherwise, call 'done' without a user object
  User.findById(payload.sub, function(err, user) {
    if (err) { return done(err, false); }
    if (user) { 
      done(null, user); 
    } else {
      done(null, false);
    }
  });
});

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
