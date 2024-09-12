const { User } = require("../models/user.model");
const AsyncHandler = require("express-async-handler");
const { validateDbId } = require("../utils/mongoId.utils");
const UnauthorizedRequestError = require("../exceptions/unauthorized.exception");
const ForbiddenRequestError = require("../exceptions/forbidden.exception");
const { cloudinaryUpload } = require("../config/cloudinary.config");

const getAllUsers = AsyncHandler(async (req, res, next) => {

});

const getUser = AsyncHandler(async (req, res, next) => {
  try {
    const { userId } = req;
    await validateDbId(userId);
    const findUser = await User.findById(userId).select("fullName email phone");
    if (!findUser) throw new UnauthorizedRequestError("Invalid User");
    req.user = {
      message: "User details retrieved",
      status: OK,
      data: findUser,
    };
    next();
  } catch (error) {
    next(error);
  }
});

const updateProfileInfo = AsyncHandler(async (req, res, next) => {
  try {
    const { userId } = req;
    await validateDbId(userId);
    const { email, phone, fullName } = req.body;
    const updateUser = await User.findByIdAndUpdate(
      userId,
      {
        email,
        fullName,
        phone,
      },
      { new: true }
    ).select("fullName email phone");
    if (!updateUser) throw new ForbiddenRequestError("Invalid User");
    req.user = {
      message: "User details updated",
      status: OK,
      data: updateUser,
    };
    next();
  } catch (error) {
    next(error);
  }
});

const uploadAvatar = AsyncHandler(async (req, res, next) => {
  try {
    const { userId } = req;
    await validateDbId(userId);

    const uploader = (path) => cloudinaryUpload(path, "image");

    const files = req.files;
    if (files.length < 1) {
      throw new BadRequestError("File not found : Error uploading");
    }

    const urls = [];
    for (const file of files) {
      const { path } = file;
      const newPath = await uploader(path);
      urls.push(newPath);
      fs.unlinkSync(path);
    }

    const updateUser = await User.findByIdAndUpdate(
      userId,
      {
        avatar: urls[0].url,
      },
      { new: true }
    )
      .lean()
      .select("fullName email phone avatar");

    if (!updateUser) throw new ForbiddenRequestError("Invalid User");
    req.user = {
      message: "User avatar updated",
      status: OK,
      data: updateUser,
    };
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = {
  getUser,
  updateProfileInfo,
  uploadAvatar,
  getAllUsers
};
