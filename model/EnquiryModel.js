const mongoose = require("mongoose");
const EnquirySchema = mongoose.Schema({
  image: String,

  name: String,
  mobile: String,
  email: String,
  message: String,
});

module.exports = mongoose.model("enquiries", EnquirySchema);
