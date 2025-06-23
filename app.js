require("./db");
const express = require("express");
const app = express();
const cors = require("cors");
const Tour = require("./model/TourModel");

const Service = require("./model/ServiceModel");

const Blog = require("./model/BlogModel");
const Enquiry = require("./model/EnquiryModel");
const Booking = require("./model/BookingModel");
const User = require("./model/UserModel");
const Usersignup = require("./model/UsersignupModel")

const jwt = require("jsonwebtoken");
const auth = require("./auth");

app.use(cors());
app.use(express.json());

/*SignUp*/
app.post("/signup", async (req, res) => {
  const { email, password, confirmpassword } = req.body;
  let exist = await User.findOne({ email: email });
  //Already exists
  if (exist) {
    return res.status(400).json({ Message: "Email Already Exist" });
  }
  //Password confirmation
  if (password !== confirmpassword) {
    return res
      .status(400)
      .json({ Message: "Password and Confirm Password doesn't Match" });
  }
  const signup = new User(req.body);
  const result = await signup.save();
  res.json({ Message: "Signup Successfull", result: result });
});

/*Login*/

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const exists = await User.findOne({ email: email });
  if (!exists) {
    return res.status(400).json({ Message: "Email doesn't Exist" });
  }
  //Password Match

  if (exists.password !== password) {
    return res.status(400).json({ Message: "Password doesn't Exist" });
  }
  /* res.json({ Message :"Login Successfull"}) */

  //PayLoad

  const payload = {
    user: {
      id: exists._id,
    },
  };
  //JWT Creation
  const token = jwt.sign(payload, "jsonSecret", { expiresIn: "1h" });
  res.json({ Message: "Login Successfull", token: token });
});
/*Protected Routes*/
app.get("/dashboard" , auth , async (req,res) => {
  const exists = await User.findOne({_id: req.user.id})
  if (!exists) {
    return res.status(400).json({ Message: "You are Not Authorized" })
  }
  else{
    res.json(exists)
  }
  
})

/*UserSignUp*/

app.post("/usersignup", async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  try {
    // Check if the email already exists
    const exist = await Usersignup.findOne({ email });
    if (exist) {
      return res.status(400).json({ Message: "Email Already Exists" });
    }

    // Check if password and confirmPassword match
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ Message: "Password and Confirm Password do not match" });
    }

    // Create new user
    const newUser = new Usersignup({
      username,
      email,
      password,
      confirmPassword, 
    });

    const result = await newUser.save();
    res.status(201).json({ Message: "Signup Successful", result });
  } catch (err) {
    res.status(500).json({ Message: "Server Error", error: err.message });
  }
});

app.get("/usersignup", async (req, res) => {
  const usersignup = await Usersignup.find();
 
    res.send(usersignup);
 
});

app.get("/usersignup/:_id", async (req, res) => {
  const _id = req.params._id;
  const usersignup = await Usersignup.findOne({ _id: _id });
  res.send(usersignup);
});

app.put("/usersignup/:_id", async (req, res) => {
  const _id = req.params._id;
  const usersignup = await Usersignup.updateOne(
    { _id: _id },
    { $set: req.body }
  );
  res.send(usersignup);
});

app.delete("/usersignup/:_id", async (req, res) => {
  const _id = req.params._id;
  const usersignup = await Usersignup.deleteOne({ _id: _id });
  res.send(usersignup);
});

app.post("/userlogin", async (req, res) => {
  const { email, password } = req.body;
  const exists = await Usersignup.findOne({ email: email });
  if (!exists) {
    return res.status(400).json({ Message: "Email doesn't Exist" });
  }
  //Password Match

  if (exists.password !== password) {
    return res.status(400).json({ Message: "Password doesn't Exist" });
  }
    /* res.json({ Message :"Login Successfull"}) */

  //PayLoad

  const payload = {
    user: {
      id: exists._id,
    },
  };
  //JWT Creation
  const token = jwt.sign(payload, "jsonSecret", { expiresIn: "1h" });
  res.json({ Message: "Login Successfull", token: token });
});

/*Protected Routes*/
app.get("/" , auth , async (req,res) => {
  const exists = await Usersignup.findOne({_id: req.user.id})
  if (!exists) {
    return res.status(400).json({ Message: "You are Not Authorized" })
  }
  else{
    res.json(exists)
  }
  
})



/*Tours*/
app.post("/tours", async (req, res) => {
  const tour = new Tour(req.body);
  const result = await tour.save();
  res.send(result);
});

app.get("/tours", async (req, res) => {
  const tours = await Tour.find();
  if (tours.length > 0) {
    res.send(tours);
  } else {
    res.send("No Men Data Found");
  }
});

app.get("/tours/:_id", async (req, res) => {
  const _id = req.params._id;
  const tour = await Tour.findOne({ _id: _id });
  res.send(tour);
});

app.put("/tours/:_id", async (req, res) => {
  const _id = req.params._id;
  const tour = await Tour.updateOne({ _id: _id }, { $set: req.body });
  res.send(tour);
});

app.delete("/tours/:_id", async (req, res) => {
  const _id = req.params._id;
  const tour = await Tour.deleteOne({ _id: _id });
  res.send(tour);
});



/*Services*/


app.post("/services", async (req, res) => {
  const service = new  Service(req.body);
  const result = await service.save();
  res.send(result);
});

app.get("/services", async (req, res) => {
  const services = await Service.find();
  if (services.length > 0) {
    res.send(services);
  } else {
    res.send("No Service's Data Found");
  }
});

app.get("/services/:_id", async (req, res) => {
  const _id = req.params._id;
  const service = await Service.findOne({ _id: _id });
  res.send(service);
});

app.put("/services/:_id", async (req, res) => {
  const _id = req.params._id;
  const service = await Service.updateOne({ _id: _id }, { $set: req.body });
  res.send(service);
});

app.delete("/services/:_id", async (req, res) => {
  const _id = req.params._id;
  const service = await Service.deleteOne({ _id: _id });
  res.send(service);
});



/*Blogs*/

app.post("/blogs", async (req, res) => {
  const blog = new Blog(req.body);
  const result = await blog.save();
  res.send(result);
});

app.get("/blogs", async (req, res) => {
  const blogs = await Blog.find();
  if (blogs.length > 0) {
    res.send(blogs);
  } else {
    res.send("No Blogs data Found");
  }
});

app.get("/blogs/:_id", async (req, res) => {
  const _id = req.params._id;
  const blog = await Blog.findOne({ _id: _id });
  res.send(blog);
});

app.put("/blogs/:_id", async (req, res) => {
  const _id = req.params._id;
  const blog = await Blog.updateOne({ _id: _id }, { $set: req.body });
  res.send(blog);
});

app.delete("/blogs/:_id", async (req, res) => {
  const _id = req.params._id;
  const blog = await Blog.deleteOne({ _id: _id });
  res.send(blog);
});


/*Enquiries*/
app.post("/enquiries", async (req, res) => {
  const enquiry = new Enquiry(req.body);
  const result = await enquiry.save();
  res.send(result);
});

app.get("/enquiries", async (req, res) => {
  const enquiries = await Enquiry.find();
  if (enquiries.length > 0) {
    res.send(enquiries);
  } else {
    res.send("No Enquiries Found");
  }
});

app.get("/enquiries/:_id", async (req, res) => {
  const _id = req.params._id;
  const enquiry = await Enquiry.findOne({ _id: _id });
  res.send(enquiry);
});

app.put("/enquiries/:_id", async (req, res) => {
  const _id = req.params._id;
  const enquiry = await Enquiry.updateOne({ _id: _id }, { $set: req.body });
  res.send(enquiry);
});

app.delete("/enquiries/:_id", async (req, res) => {
  const _id = req.params._id;
  const enquiry = await Enquiry.deleteOne({ _id: _id });
  res.send(enquiry);
});

/*Bookings*/
app.post("/bookings", async (req, res) => {
  const booking = new Booking(req.body);
  const result = await booking.save();
  res.send(result);
});

app.get("/bookings", async (req, res) => {
  const bookings = await Booking.find();
  if (bookings.length > 0) {
    res.send(bookings);
  } else {
    res.send("No Bookings Found");
  }
});

app.get("/bookings/:_id", async (req, res) => {
  const _id = req.params._id;
  const booking = await Booking.findOne({ _id: _id });
  res.send(booking);
});

app.put("/bookings/:_id", async (req, res) => {
  const _id = req.params._id;
  const booking = await Booking.updateOne({ _id: _id }, { $set: req.body });
  res.send(booking);
});

app.delete("/bookings/:_id", async (req, res) => {
  const _id = req.params._id;
  const booking = await Booking.deleteOne({ _id: _id });
  res.send(booking);
});

app.listen(5000, () => console.log("API STARTED"));