const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(proxy("/auth", { target: "https://igallery-prod.herokuapp.com/" }));
  app.use(proxy("/api", { target: "https://igallery-prod.herokuapp.com/" }));
};
