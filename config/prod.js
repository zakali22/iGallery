// prod.js production keys

module.exports = {
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  facebookKey: process.env.FACEBOOK_CLIENT_ID,
  facebookSecret: process.env.FACEBOOK_CLIENT_SECRET,
  mongo_uri: process.env.MONGO_URI,
  cookieKey: process.env.COOKIE_KEY,
  unsplashKey: process.env.UNSPLASH_CLIENT_ID
};
