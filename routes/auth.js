const passport = require("passport");
require("es6-promise").polyfill();
require("isomorphic-fetch");
const Unsplash = require("unsplash-js").default;
const toJson = Unsplash.toJson;
const queryString = require("query-string");
const axios = require("axios");

// Require the new unsplash instance
const unsplash = require("../services/unsplash");

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
  app.get("/auth/facebook", passport.authenticate("facebook"));

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

  app.get("/api/logout", (req, res) => {
    req.logout();
    console.log(req.user);
    res.redirect("http://localhost:3000/");
  });
};
