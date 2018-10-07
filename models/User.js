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
  image: {
    type: String,
    default:
      "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=113636006274386&height=50&width=50&ext=1541469489&hash=AeRoGBFqPCzpHyQ2"
  },
  downloadedImages: {
    type: Array,
    default: []
  },
  email: String
});

mongoose.model("Users", userSchema);
