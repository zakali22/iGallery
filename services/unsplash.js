const Unsplash = require("unsplash-js").default;
const keys = require("../config/keys");

const unsplash = new Unsplash({
  applicationId: keys.unsplashKey,
  secret: keys.unsplashSecret,
  callbackUrl: "http://localhost:5000/callback"
});

module.exports = unsplash;
