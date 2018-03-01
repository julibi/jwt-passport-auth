const Authentication = require('./controllers/authentication');
const passportServices = require('./services/passport');
const passport = require('passport');

// by default passport wants to create a cookie based auth,so we have to set session to false
// we are using jwt
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app){
  app.get('/', requireAuth, function(req, res) {
    res.send({ Hi: 'there, you passed passport authentication'});
  });
  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup);
};
