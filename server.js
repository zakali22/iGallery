const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const passport = require("passport");
const cookieSession = require("cookie-session");
const expressValidator = require("express-validator");
const session = require("express-session");
const path = require("path");

const keys = require("./config/keys");

// Header 'Allow-origin'
app.use(function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

const url = keys.mongo_uri;
mongoose.connect(
  url,
  { useNewUrlParser: true }
);

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Cookie session
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days expiry
    keys: [keys.cookieKey]
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session());

//---------------------- Local Passport------------------------------//
// Express Messages
app.use(require("connect-flash")());
app.use((req, res, next) => {
  res.locals.messages = require("express-messages")(req, res);
  res.locals.user = req.user || null;
  next();
});

app.use(
  expressValidator({
    errorFormatter: function(param, msg, value) {
      const namespace = param.split("."),
        root = namespace.shift(),
        formParam = root;

      while (namespace.length) {
        formParam += "[" + namespace.shift() + "]";
      }

      return {
        param: formParam,
        msg: msg,
        value: value
      };
    }
  })
);

// Mongoose Collection creation
require("./models/User");
require("./services/passport");

// Routes
require("./routes/auth")(app);
require("./routes/api")(app);

var reqTimer = setTimeout(function wakeUp() {
  request("https://nameless-gorge-19527.herokuapp.com", function() {
    console.log("WAKE UP DYNO");
  });
  return (reqTimer = setTimeout(wakeUp, 1200000));
}, 1200000);

// Conditional Production environment
if (process.env.NODE_ENV === "production") {
  app.use(express.static("clientside/build"));
  const path = require("path");
  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "clientside", "build", "index.html"));
  });
  app.get("/discover", (req, res) => {
    res.sendFile(path.resolve(__dirname, "clientside", "build", "index.html"));
  });
  app.get("/photo/:id", (req, res) => {
    res.sendFile(path.resolve(__dirname, "clientside", "build", "index.html"));
  });
  app.get("/search/:search", (req, res) => {
    res.sendFile(path.resolve(__dirname, "clientside", "build", "index.html"));
  });
}

// Port
const PORT = process.env.PORT || 5000;
app.listen(PORT);
