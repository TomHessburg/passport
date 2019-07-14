require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth-routes");
const cookieSession = require("cookie-session");
const passport = require("passport");
const passportSetup = require("./config/passport-setup.js");

const app = express();
// set up view enginer
app.set("view engine", "ejs");

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: ["nottooworriedabouthavingasafekeyrightnow"]
  })
);

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// mongo connection
// hey future me, you probably shut down the cluster if you ever come back to this :)
mongoose.connect(
  process.env.MONGO_CONNECTION,
  () => {
    console.log("connected to mongo");
  },
  { useNewUrlParser: true }
);

// auth routes for google passport
app.use("/auth", authRoutes);

// create home route
app.get("/", (req, res) => {
  res.render("home");
});

app.listen(3000, () => console.log("Listening on port 3000"));
