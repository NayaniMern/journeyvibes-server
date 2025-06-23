const mongoose = require("mongoose");
const UsersignupSchema = mongoose.Schema({
 

  username: String,
  
  email: String,
  password: String,
  confirmPassword: String
});

module.exports = mongoose.model("usersignup", UsersignupSchema);
