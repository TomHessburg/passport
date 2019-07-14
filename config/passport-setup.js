require("dotenv").config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const User = require("../models/user-model");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id).exec();
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      // options for the strategy
      callbackURL: "/auth/google/redirect",
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    },
    async (accessToken, refreshToken, profile, done) => {
      // passport callback function

      let googleId = profile.id;
      const user = await User.findOne({ googleId }).exec();

      if (user) {
        console.log(user);
        done(null, user);
      } else {
        const newUser = await User.create({
          username: profile.displayName,
          googleId: profile.id
        });
        console.log(newUser);
        done(null, newUser);
      }
    }
  )
);
