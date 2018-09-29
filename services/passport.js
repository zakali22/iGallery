const passport = require("passport");
const mongoose = require("mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;

const keys = require("../config/keys");
const User = mongoose.model("Users");

// Serialization
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialization
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

// Verification and Creation of FACEBOOK
passport.use(
  new FacebookStrategy(
    {
      clientID: keys.facebookKey,
      clientSecret: keys.facebookSecret,
      callbackURL: "http://localhost:5000/auth/facebook/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ facebookId: profile.id }).then(user => {
        if (user) {
          done(null, user);
        } else {
          new User({
            facebookId: profile.id
          })
            .save()
            .then(user => {
              done(null, user);
            });
        }
      });
    }
  )
);

// Verification and Creation of GOOGLE
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then(user => {
        if (user) {
          done(null, user);
        } else {
          new User({
            googleId: profile.id
          })
            .save()
            .then(user => {
              done(null, user);
            });
        }
      });
    }
  )
);
