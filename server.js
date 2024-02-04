const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("./data/database");
const passport = require("passport");
const session = require("express-session");
const githubStrategy = require("passport-github2").Strategy;
const cors = require("cors");

const port = process.env.PORT || 8081;
const app = express();

app
  .use(bodyParser.json())
  .use(
    session({
      secret: "Secret",
      resave: false,
      saveUninitialized: true,
    })
  )

  .use(passport.initialize())
  .use(passport.session())

  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, content-type, Accept, Z-Key, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, PATCH, DELETE, OPTIONS"
    );
    next();
  })
  .use(cors({
    methods: ["GET", "POST", "PUT", "DELETE", "UPDATE", "PATCH"]
  }))
  .use(cors({
    origin: "*"
  }))
  .use("/", require("./routes/index.js"));

passport.use(
  new githubStrategy({
      clientID: process.env.GITHUB_CLIENT_ID,
      clienSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },

    function (accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get("/", (req, res) => {
  res.send(
    req.session.user !== undefined ?
    `Logged in as ${req.session.user.displayName}` :
    "Logged Out"
  );
});
app.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/api-docs",
    session: false,
  }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect("/");
  }
);

//process.on('uncaughtException', (err, origin) => {
// console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
//});

mongodb.initDatabase((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to Database and listening on ${port}`);
  }
});