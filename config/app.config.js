const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const MongoStore = require("connect-mongo");

const notFound = require("../middlewares/notfound.middleware");
const errHandler = require("../middlewares/errhandler.middleware");
const router = require("../routes/app.route");
const session = require("express-session");
const {
  nodeEnv,
  localMUrl,
  webMUrl,
  sessionSecret,
} = require("./constants.config");
const authRouter = require("../routes/auth.route");
const userRouter = require("../routes/user.route");
const onboardingRouter = require("../routes/onboarding.route");

const selectDb = () => {
  if (nodeEnv == "production") {
    return webMUrl;
  } else {
    return localMUrl;
  }
};

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["POST, GET, PUT, PATCH, DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(
  session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: selectDb(),
      ttl: 60 * 60, // = 1 hour.
    }),
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

app.use(router);
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/onboarding", onboardingRouter);

app.use(notFound);
app.use(errHandler);

module.exports = app;
