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
// Require the keys
const keys = require("./config/keys");
require("dotenv").config();

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

// Mongoose
var url = process.env.MONGO_URI;
mongoose.connect(
  url,
  { useNewUrlParser: true }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  // we're connected!
  console.log("Database connected");
});
// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// ... other app.use middleware setups
app.use(express.static(path.join(__dirname, "clientside", "build")));

// ...
// Right before your app.listen(), add this:
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "clientside", "build", "index.html"));
});

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

// Unsplash API
require("./services/unsplash.js");
// Routes
require("./routes/auth")(app);
require("./routes/api")(app);

// Conditional Production environment

// Port
const PORT = process.env.PORT || 500;
app.listen(5000);
