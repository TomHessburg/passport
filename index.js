require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth-routes");
const app = express();
const passportSetup = require("./config/passport-setup.js");

// set up view enginer
app.set("view engine", "ejs");

// mongo connection
// hey future me, you probably shut down the cluster if you ever come back to this :)
mongoose.connect(process.env.MONGO_CONNECTION, () => {
  console.log("connected to mongo");
});

// auth routes for google passport
app.use("/auth", authRoutes);

// create home route
app.get("/", (req, res) => {
  res.render("home");
});

app.listen(3000, () => console.log("Listening on port 3000"));
