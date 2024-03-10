const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { google } = require("./env");
const Accounts = require("../models/accountModel");
const passport = require("passport");

passport.use(
  new GoogleStrategy(
    {
      clientID: google.clientID,
      clientSecret: google.clientSecret,
      callbackURL: google.callBack,
    },
    async function (accessToken, refreshToken, profile, cb) {
      try {
        const account = await Accounts.findOne({ googleId: profile.id });
        if (account) {
          return cb(null, account);
        } else {
          const newAccount = new Accounts({
            method: "Google",
            googleId: profile.id,
            fullName: profile.displayName,
            email: profile._json.email,
            picture: profile._json.picture,
          });
          const account = await newAccount.save();
          return cb(null, account);
        }
      } catch (err){
        console.log(err)
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  Accounts.findById(id).then((result) => {
    done(null, result);
  });
});
