const passport = require("passport");

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
      res.send("Redirecting...");
    }
  );

  // FACEBOOK
  app.get("/auth/facebook", passport.authenticate("facebook"));

  app.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook"),
    (req, res) => {
      res.send("Redirecting...");
    }
  );
  app.get("/api/logout", (req, res) => {
    req.logout();
    console.log(req.user);
    res.send(req.user);
  });

  // Get request for the current signed in User via Google
  app.get("/api/current_user", (req, res) => {
    console.log(req.user);
    res.send(req.user);
  });
};
