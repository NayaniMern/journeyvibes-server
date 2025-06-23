const mongoose = require("mongoose");
const BookingSchema = mongoose.Schema({
 fullName:String,
   phone: String,
    
    email : String,
  
    tourName : String,
    startDate : String,
    endDate : String,
    people:String
});

module.exports = mongoose.model("bookings", BookingSchema);
