require("es6-promise").polyfill();
require("isomorphic-fetch");
const Unsplash = require("unsplash-js").default;
const toJson = Unsplash.toJson;
// Require the authentication parameters
const unsplash = require("../services/unsplash");
const axios = require("axios");
const queryString = require("query-string");

// Required to download file
const Fs = require("fs");
const Path = require("path");

const keys = require("../config/keys");

module.exports = app => {
  // GET photos
  app.get("/api/unsplash/getPhotos/:page", (req, res) => {
    axios({
      method: "GET",
      url: `https://api.unsplash.com/photos?per_page=100&page=${
        req.params.page
      }&client_id=${keys.unsplashKey}`
    }).then(response => {
      const photos = response.data;
      let photoArray = [];
      photos.forEach(photo => {
        let photoObj = {};

        let urlObject = {};
        urlObject.url = photo.urls.small;
        urlObject.id = photo.id;

        let userObject = {};
        userObject.name = photo.user.name;
        userObject.link = photo.user.links.html;
        userObject.image = photo.user.profile_image.small;
        photoObj.user = userObject;
        photoObj.photo = urlObject;
        photoArray.push(photoObj);
      });

      let organisedArr = [];
      let imagePerCol = Math.round(photoArray.length / 3);
      console.log(photoArray.length, imagePerCol);
      let column1 = photoArray.slice(0, imagePerCol);
      let column2 = photoArray.slice(imagePerCol, imagePerCol * 2);
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
      const data = response.data;
      let photoObj = {};
      let userObject = {};
      userObject.name = data.user.name;
      userObject.link = data.user.links.html;
      userObject.image = data.user.profile_image.small;
      userObject.username = data.user.username;
      userObject.likes = data.likes;
      photoObj.user = userObject;
      photoObj.photo = data.urls.small;
      photoObj.downloadLink = data.links.download;
      res.send(photoObj);
    });
  });

  // DOWNLOAD a photo
  app.post("/api/unsplash/getPhoto/:id/", (req, res) => {
    const download = async () => {
      const homedir = require("os").homedir();
      const url = req.body.link;
      const path = Path.join(homedir, "Downloads", `${req.params.id}.jpg`);
      console.log(homedir);
      const response = await axios({
        method: "GET",
        url: url,
        responseType: "stream"
      });
      response.data.pipe(Fs.createWriteStream(path));

      return new Promise((resolve, reject) => {
        response.data.on("end", () => {
          resolve();
        });

        response.data.on("error", () => {
          reject(err);
        });
      });
    };
    download();
    res.send("done");
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
