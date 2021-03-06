const passport = require("passport");
const mongoose = require("mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

const User = mongoose.model("Users");

const keys = require("../config/keys");

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

// Local Strategy

const comparePassword = (userPass, hash, callback) => {
  bcrypt.compare(userPass, hash, (err, isMatch) => {
    if (err) throw err;
    callback(null, isMatch);
  });
};

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }).then(user => {
      if (!user) {
        return done(null, false, { message: "Username does not exist" });
      }
      comparePassword(password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Password is incorrect" });
        }
      });
    });
  })
);

// Verification and Creation of FACEBOOK
passport.use(
  new FacebookStrategy(
    {
      clientID: keys.facebookKey,
      clientSecret: keys.facebookSecret,
      callbackURL: "/auth/facebook/callback",
      proxy: true,
      profileFields: [
        "id",
        "displayName",
        "email",
        "first_name",
        "last_name",
        "middle_name",
        "link",
        "photos"
      ]
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      User.findOne({ facebookId: profile.id }).then(user => {
        if (user) {
          done(null, user);
        } else {
          new User({
            facebookId: profile.id,
            name: profile.displayName,
            image: profile._json.picture.data.url,
            email: profile._json.email,
            first_name: profile._json.name.givenName,
            last_name: profile._json.name.familyName
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
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then(user => {
        if (user) {
          done(null, user);
        } else {
          new User({
            googleId: profile.id,
            name: profile.displayName,
            image: profile._json.image.url,
            email: profile._json.emails[0].value,
            first_name: profile._json.name.givenName,
            last_name: profile._json.name.familyName
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
