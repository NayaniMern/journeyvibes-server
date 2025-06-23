const mongoose = require("mongoose");
const TourSchema = mongoose.Schema({
  image: String,
  image1: String,
  image2: String,
  image3: String,
  image4: String,

  destination: String,
  rating: String,
  tourname: String,

  category: String,
  type: String,
  rate: String,
  inclusions: String,

  exclusions: String,
  highlights: String,
  duration: String,
  description: String,
});

module.exports = mongoose.model("tours", TourSchema);
