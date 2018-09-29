require("es6-promise").polyfill();
require("isomorphic-fetch");
const Unsplash = require("unsplash-js").default;
const toJson = Unsplash.toJson;
// Require the authentication parameters
const unsplash = require("../services/unsplash");
const axios = require("axios");
const queryString = require("query-string");

module.exports = app => {
  // GET photos
  app.get("/api/unsplash/getPhotos", (req, res) => {
    console.log(unsplash._bearerToken);
    axios({
      method: "GET",
      url: "https://api.unsplash.com/photos?page=1&per_page=15&order_by=latest",
      headers: { Authorization: "Bearer " + unsplash._bearerToken }
    }).then(response => {
      res.send(response.data);
    });
  });

  // GET a specific image
  app.get("/api/unsplash/getPhoto/:id", (req, res) => {
    console.log(req.params.id);
    axios({
      method: "GET",
      url: `https://api.unsplash.com/photos/${req.params.id}`,
      headers: { Authorization: "Bearer " + unsplash._bearerToken }
    }).then(response => {
      res.send(response.data);
    });
  });

  // SEARCH a photo
  app.post("/api/unsplash/searchPhoto/", (req, res) => {
    axios({
      method: "GET",
      url: `https://api.unsplash.com/search/photos?page=1&query=${
        req.body.searchString
      }`,
      headers: { Authorization: "Bearer " + unsplash._bearerToken }
    }).then(response => {
      res.send(response.data);
    });
  });

  // SEARCH a user
  app.post("/api/unsplash/searchUser/", (req, res) => {
    axios({
      method: "GET",
      url: `https://api.unsplash.com/search/users?page=1&query=${
        req.body.searchString
      }`,
      headers: { Authorization: "Bearer " + unsplash._bearerToken }
    }).then(response => {
      res.send(response.data);
    });
  });

  // GET a specific user
  app.get("/api/unsplash/getProfile/:username", (req, res) => {
    axios({
      method: "GET",
      url: `https://api.unsplash.com/users/${req.params.username}`,
      headers: { Authorization: "Bearer " + unsplash._bearerToken }
    }).then(response => {
      res.send(response.data);
    });
  });

  // GET photos by user
  app.get("/api/unsplash/getUserPhotos/:username", (req, res) => {
    console.log(req.params.username);
    axios({
      method: "GET",
      url: `https://api.unsplash.com/users/${req.params.username}/photos`,
      headers: { Authorization: "Bearer " + unsplash._bearerToken }
    }).then(response => {
      res.send(response.data);
    });
  });
};
