const passport = require("passport");
require("es6-promise").polyfill();
require("isomorphic-fetch");
const Unsplash = require("unsplash-js").default;
const toJson = Unsplash.toJson;
const queryString = require("query-string");
const axios = require("axios");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
// Require the new unsplash instance
const unsplash = require("../services/unsplash");

const User = mongoose.model("Users");

module.exports = app => {
  // GOOGLE
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("http://localhost:3000/");
    }
  );

  // FACEBOOK
  app.get(
    "/auth/facebook",
    passport.authenticate("facebook", {
      scope: ["public_profile", "email"]
    })
  );

  app.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook"),
    (req, res) => {
      res.redirect("http://localhost:3000/");
    }
  );

  // UNSPLASH
  app.get("/auth/unsplash", (req, res) => {
    console.log("redirected");
    res.redirect(
      unsplash.auth.getAuthenticationUrl(["public", "read_user", "read_photos"])
    );
  });
  app.get("/auth/unsplash/callback", (req, res) => {
    axios
      .post("https://unsplash.com/oauth/token", {
        client_id: unsplash._applicationId,
        client_secret: unsplash._secret,
        redirect_uri: unsplash._callbackUrl,
        code: req.query.code,
        grant_type: "authorization_code"
      })
      .then(response => {
        unsplash.auth.setBearerToken(response.data.access_token);
        res.send("Redirecting from unsplash...");
      });
  });

  app.get("/api/current_user", (req, res) => {
    console.log(req.user);
    res.send(req.user);
  });

  app.post("/api/edit/:id", (req, res) => {
    console.log(req.body);
    User.updateOne(
      { _id: req.user._id },
      {
        $set: {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          name: req.body.name
        }
      }
    ).then(response => {
      console.log(response);
    });
    res.send("done");
  });

  // Register a user

  const registerUser = (newUser, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) {
          console.log(err);
        }
        newUser.password = hash;
        newUser.save(callback);
      });
    });
  };

  app.post("/api/add", (req, res, next) => {
    req.checkBody("first_name", "First name is required").notEmpty();
    req.checkBody("last_name", "Last name is required").notEmpty();
    req.checkBody("username", "Username is required").notEmpty();
    req.checkBody("email", "Email is required").notEmpty();
    if (req.body.email) {
      req.checkBody("email", "Email is not valid").isEmail();
    }
    req.checkBody("password", "Password is required").notEmpty();
    req
      .checkBody("confirm_password", "Passwords do not match")
      .equals(req.body.password);

    let errors = req.validationErrors();
    if (errors) {
      console.log(errors);
      res.send({ error: errors });
    } else {
      const user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      });

      User.findOne({ email: req.body.email }).then(profile => {
        if (profile) {
          res.send({ exists: { msg: "Email already exists" } });
        } else {
          registerUser(user, (err, user) => {
            console.log(user);
            if (err) {
              console.log(err);
            }
          });
          res.send({ success: "Successfully registered" });
        }
      });
    }
  });

  app.post("/api/login", (req, res) => {
    console.log("got");
    res.send("done");
  });

  app.get("/api/logout", (req, res) => {
    req.logout();
    console.log(req.user);
    res.redirect("http://localhost:3000/");
  });
};
