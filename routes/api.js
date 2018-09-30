require("es6-promise").polyfill();
require("isomorphic-fetch");
const Unsplash = require("unsplash-js").default;
const toJson = Unsplash.toJson;
// Require the authentication parameters
const unsplash = require("../services/unsplash");
const axios = require("axios");
const queryString = require("query-string");

const keys = require("../config/keys");

module.exports = app => {
  // GET photos
  app.get("/api/unsplash/getPhotos", (req, res) => {
    axios({
      method: "GET",
      url: `https://api.unsplash.com/photos?per_page=24&client_id=${
        keys.unsplashKey
      }`
    }).then(response => {
      const photos = response.data;
      let photoArray = [];
      photos.forEach(photo => {
        photoArray.push(photo.urls.small);
      });
      let organisedArr = [];
      let imagePerCol = Math.round(photoArray.length / 3);
      let column1 = photoArray.slice(0, imagePerCol);
      let column2 = photoArray.slice(imagePerCol, imagePerCol * 2 - 1);
      let column3 = photoArray.slice(imagePerCol * 2);
      organisedArr.push(column1);
      organisedArr.push(column2);
      organisedArr.push(column3);
      res.send(organisedArr);
    });
  });

  // GET a specific image
  app.get("/api/unsplash/getPhoto/:id", (req, res) => {
    console.log(req.params.id);
    axios({
      method: "GET",
      url: `https://api.unsplash.com/photos/${req.params.id}?client_id=${
        keys.unsplashKey
      }`
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
      }?client_id=${keys.unsplashKey}`
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
      }?client_id=${keys.unsplashKey}`
    }).then(response => {
      res.send(response.data);
    });
  });

  // GET a specific user
  app.get("/api/unsplash/getProfile/:username", (req, res) => {
    axios({
      method: "GET",
      url: `https://api.unsplash.com/users/${req.params.username}?client_id=${
        keys.unsplashKey
      }`
    }).then(response => {
      res.send(response.data);
    });
  });

  // GET photos by user
  app.get("/api/unsplash/getUserPhotos/:username", (req, res) => {
    console.log(req.params.username);
    axios({
      method: "GET",
      url: `https://api.unsplash.com/users/${
        req.params.username
      }/photos?client_id=${keys.unsplashKey}`
    }).then(response => {
      res.send(response.data);
    });
  });
};
