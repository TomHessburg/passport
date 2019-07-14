const mongoose = require("mongoose");

const user = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  googleId: {
    type: String
  }
});

const User = mongoose.model("user", user);

module.exports = User;
