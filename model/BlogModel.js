const mongoose = require("mongoose");
const BlogSchema = mongoose.Schema({
  image: String,

  name: String,
  des: String,
  date: String,
  user: String,
  description: String,
});

module.exports = mongoose.model("blogs", BlogSchema);
