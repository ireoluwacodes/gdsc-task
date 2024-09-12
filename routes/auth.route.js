const { Router } = require("express");
const {
  register,
  logout,
  login,
  refresh,
  handleGoogleAuth,
} = require("../controllers/auth.controller");
const validator = require("../middlewares/validator.middleware");
const { createUserSchema } = require("../validators/auth/signup.schema");
const { loginSchema } = require("../validators/auth/login.schema");
const authMiddleware = require("../middlewares/auth.middleware");
const successHandler = require("../middlewares/success.middleware");
const passportGoogle = require("../middlewares/auth.google.middleware");
// const passportApple = require("../middlewares/auth.apple.middleware")

const authRouter = Router();

authRouter
  .route("/register")
  .post(validator(createUserSchema), register, successHandler);

authRouter.route("/login").post(validator(loginSchema), login, successHandler);

authRouter
  .route("/google")
  .get(passportGoogle.authenticate("google", { scope: ["email", "profile"] }));

authRouter
  .route("/google/callback")
  .get(
    passportGoogle.authenticate("google", { session: false }),
    handleGoogleAuth,
    successHandler
  );

// authRouter.route("/apple").get()

authRouter.route("/refresh").get(refresh, successHandler);
authRouter.route("/sign-out").get(authMiddleware, logout, successHandler);

module.exports = authRouter;
