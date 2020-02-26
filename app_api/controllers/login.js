const db = require('../models/db');
const express = require('express');
const router = express.Router();
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
    qtext = 'SELECT uid, email, password FROM users WHERE email = $1';
    qvalues = [username];
    db.client.query(qtext, qvalues, (err, result) => {
      if (err) {return done(err) };
      if (result.rows.length === 0) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!(password === result.rows[0].password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, { id: result.rows[0].uid });
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  done(null, id);
});

module.exports.doLogin = function (req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.redirect('../login'); }
    req.login(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('../lists');
    });
  })(req, res, next);
}
