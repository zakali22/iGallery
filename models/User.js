const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  facebookId: String,
  googleId: String,
  name: String,
  username: String,
  password: String,
  first_name: String,
  last_name: String,
  image: String,
  downloadedImages: {
    type: Array,
    default: []
  },
  email: String
});

mongoose.model("Users", userSchema);
