require("es6-promise").polyfill();
require("isomorphic-fetch");
const Unsplash = require("unsplash-js").default;
const toJson = Unsplash.toJson;
// Require the authentication parameters
const unsplash = require("../services/unsplash");

module.exports = app => {
  // AUTHENTICATION PROCESS
  app.get("/auth/unsplash", (req, res) => {
    res.redirect(unsplash.auth.getAuthenticationUrl(["public", "read_user"]));
  });
  app.get("/callback", (req, res) => {
    unsplash.auth
      .userAuthentication(req.query.code)
      .then(toJson)
      .then(json => {
        unsplash.auth.setBearerToken(json.access_token);
      });
    res.send("Redirecting from unsplash....");
  });

  // GET current user
  app.get("/api/unsplash/current_user", (req, res) => {
    unsplash.currentUser
      .profile()
      .then(toJson)
      .then(json => {
        console.log(json);
      });
  });
};
