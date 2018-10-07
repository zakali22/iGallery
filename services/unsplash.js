const Unsplash = require("unsplash-js").default;

const unsplash = new Unsplash({
  applicationId: keys.unsplashKey,
  secret: keys.unsplashSecret,
  callbackUrl: "http://localhost:5000/auth/unsplash/callback"
});

module.exports = unsplash;
