const express = require("express");
const authRoutes = require("./routes/auth-routes");
const app = express();

// set up view enginer
app.set("view engine", "ejs");

app.use("/auth", authRoutes);

// create home route
app.get("/", (req, res) => {
  res.render("home");
});

app.listen(3000, () => console.log("Listening on port 3000"));
