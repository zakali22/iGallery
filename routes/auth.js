const queryString = require("query-string");
const axios = require("axios");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const SALT_INT = 10;
const mongoose = require("mongoose");
const User = mongoose.model("Users");
const { auth } = require("../middleware/requireLogin");

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
      console.log(req.user);
      res.redirect("/");
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
      res.redirect("/");
    }
  );

  const registerUser = (newUser, callback) => {
    bcrypt.genSalt(SALT_INT, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) {
          console.log(err);
        }
        newUser.password = hash;
        newUser.save(callback);
      });
    });
  };

  // Register User

  app.post("/auth/register", (req, res) => {
    req.checkBody("first_name", "First name is required").notEmpty();
    req.checkBody("last_name", "Last name is required").notEmpty();
    req.checkBody("email", "Email is required").notEmpty();
    if (req.body.email) {
      req.checkBody("email", "Email is not valid").isEmail();
    }
    req.checkBody("password", "Password is required").notEmpty();
    req
      .checkBody("password", "Password must contain a number")
      .matches("[0-9]");
    req.checkBody("postcode", "Postcode is required").notEmpty();
    req
      .checkBody("postcode", "Postcode must contain a number")
      .matches("[0-9]");
    req
      .checkBody("password", "Password must be at least 5 characters")
      .isLength({ min: 5 });

    let errors = req.validationErrors();
    if (errors) {
      return res.send({ error: errors });
    }
    User.find({ email: req.body.email }, (err, email) => {
      if (email.length > 0) {
        return res.send({ error: { email: "Email already exists" } });
      }
      const user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        name: `${req.body.first_name} ${req.body.last_name}`,
        postcode: req.body.postcode
      });
      registerUser(user, (err, user) => {
        res.send({ success: "Successfully registered" });
        if (err) {
        }
      });
    });
  });

  app.post("/auth/tasker_success", (req, res) => {
    console.log(req.body);
    User.update(
      { _id: req.body.id },
      { $set: { tasker_registered: true } },
      (err, user) => {
        console.log(user);
        res.sendStatus(200);
      }
    );
  });

  // Edit user
  app.post("/auth/edit/:id", auth, (req, res) => {
    User.update({ _id: req.params.id }, { $set: req.body }, (err, user) => {
      if (err) {
        return res.json({ success: false, err });
      }
      User.find({ _id: req.user._id }, (err, user) => {
        if (err) return res.json({ success: false, err });
        if (user) {
          if (user.length > 0) {
            return res.json({
              basic_info: {
                ...user[0]._doc,
                isAuth: true
              }
            });
          } else {
            console.log(user.length);
            return res.json({
              isAuth: false
            });
          }
        }
      });
    });
  });

  // Protecting Routes
  app.get("/auth/users", auth, (req, res) => {
    console.log(req.user._id);
    User.find({ _id: req.user._id }, (err, user) => {
      if (user) {
        if (user.length > 0) {
          return res.json({
            basic_info: {
              ...user[0]._doc,
              isAuth: true
            }
          });
        } else {
          console.log(user.length);
          return res.json({
            isAuth: false
          });
        }
      }
    });
  });

  app.get("/auth/deactivate/:id", (req, res) => {
    User.remove({ _id: req.params.id }, (err, user) => {
      res.status(200).json({ success: true });
    });
  });

  // Login User
  app.post("/auth/signin", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.send(info);
      }
      req.login(user, function(err) {
        if (err) {
          return next(err);
        }
        return res.send({ success: "Successfully loggedin" });
      });
    })(req, res, next);
  });

  // Logout User
  app.get("/auth/logout", (req, res) => {
    req.logout();
    res.json({ logout: true });
  });

  app.get("/api/logout", (req, res) => {
    req.logout();
    console.log(req.user);
    res.redirect("/");
  });
};
