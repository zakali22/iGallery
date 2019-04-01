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
      "https://lh3.googleusercontent.com/YDR_Q9nZfYHfRonJAv4jU6Vkz1-Dp04UUhCb0qzdUixE-R_nLo9Ho_o8HWKLIsc3T_fO1zulAVNyv5w9SbTDlpK4C3o6QnpIT3wiIUa5P6SRvvZlCg1QSSBA0iYE7kL7J8pUmmSRfkE_nwDoW4iPZ5gqGPs5DPE8l5Iirtkv51XkiekP7sekJXRzqYkEYZw_5jaSlA3rNzx1xC0BCylPHitEr3VzIRilV4lTTaDsWlf8BY-nuEJyX3j0gIDhZHig2Ni41JiAXZ9UUV_k8DOvy-f7-aESNHe8jOuv6aUjunQiKYqF5noHC8W6TI1T-9eSXP0AFhma3L3KR5sGpXWUnfcHPulMtelPWzFgNqDyBwUxKcwmYVrVF2P9nPgAOUjpgtZ_jmLYaS10b6NsvBzE8LNp14dnfk4NzgzZlE-ZMmQVpCpA7AgnOKKxXEoObNlhmPqU31290_u0c53R4cCpxFveUe2yCBamURyKW2E-AMByAyFGO9SXCUB6Ufgi2Mhk2tT2asD925mdkUZU2V25nqlQwSrwiCEhxHpPZJut_T_j6_WLo9X7YZOot2OsrcDtPhj2LCOji6xpD0XGSHf0OELSjcyw4zJ6MvldhQd5f4nUF1hZnq3VGL1avDYIb3CInehY9JzU8llJXDRi87syw0w3BohfVh4=s450-no"
  },
  downloadedImages: {
    type: Array,
    default: []
  },
  email: String
});

mongoose.model("Users", userSchema);
