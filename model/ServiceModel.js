const mongoose = require("mongoose");
const ServiceSchema = mongoose.Schema({
  image: String,
  name: String,




  description: String,
});

module.exports = mongoose.model("services", ServiceSchema);
