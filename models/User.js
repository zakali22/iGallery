const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  facebookId: String,
  googleId: String,
  name: String,
  image: String
});

mongoose.model("Users", userSchema);
