const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const {
  getUser,
  updateProfileInfo,
  uploadAvatar,
  getAllUsers,
} = require("../controllers/user.controller");
const successHandler = require("../middlewares/success.middleware");
const { uploadPhoto } = require("../middlewares/upload.middleware");
const validator = require("../middlewares/validator.middleware");
const { editProfileSchema } = require("../validators/auth/editProfile.schema");

const userRouter = Router();

userRouter.route("/").get(authMiddleware, getAllUsers, successHandler);

userRouter.route("/current-user").get(authMiddleware, getUser, successHandler);

userRouter
  .route("/update-user")
  .patch(
    authMiddleware,
    validator(editProfileSchema),
    updateProfileInfo,
    successHandler
  );

userRouter
  .route("/update-user-avatar")
  .put(
    authMiddleware,
    uploadPhoto.array("image", 1),
    uploadAvatar,
    successHandler
  );

module.exports = userRouter;
