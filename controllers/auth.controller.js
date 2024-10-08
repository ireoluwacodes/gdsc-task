const AsyncHandler = require("express-async-handler");
const { User } = require("../models/user.model");
const ForbiddenRequestError = require("../exceptions/forbidden.exception");
const { hashPassword, comparePassword } = require("../utils/hashing.utils");
const { CREATED, OK } = require("http-status");
const UnauthorizedRequestError = require("../exceptions/unauthorized.exception");
const { signToken, signRefreshToken } = require("../utils/token.utils");
const { validateDbId } = require("../utils/mongoId.utils");

const cookieConfig = {
  httpOnly: true,
  secure: true,
  sameSite: "None",
  maxAge: 72 * 60 * 60 * 1000,
};

// controller to create a new user
const register = AsyncHandler(async (req, res, next) => {
  try {
    const { fullName, email, password, phone } = req.body;
    const findUser = await User.findOne({
      $or: [{ email }, { phone }],
    });
    if (findUser) throw new ForbiddenRequestError("User Already exists");
    // utility function to hash password with bcrypt
    const hash = await hashPassword(password);
    const user = await User.create({
      fullName,
      email,
      hash,
      phone,
      loginScheme: "email",
    });
    req.user = {
      message: "User Created Successfully",
      status: CREATED,
      data: {
        ...user._doc,
        hash: undefined,
        updatedAt: undefined,
        loginScheme: undefined,
      },
    };
    next();
  } catch (error) {
    next(error);
  }
});

// controller to log a user in
const login = AsyncHandler(async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const findUser = await User.findOne({ email })
      .select("fullName email hash phone avatar loginScheme")
      .lean();
    if (!findUser)
      throw new UnauthorizedRequestError("User not found, Please register");
    // user must have registered with email
    if (findUser.loginScheme !== "email")
      throw new ForbiddenRequestError(
        `Invalid login scheme login with ${findUser.loginScheme}`
      );
    //   compare the hash with password..
    const checkPass = await comparePassword(findUser.hash, password);
    if (!checkPass) throw new UnauthorizedRequestError("Invalid password");
    const token = await signToken(findUser._id);
    // utility fuction for signing tokens, set refresh token as cookie and save to db
    const refreshToken = await signRefreshToken(findUser._id);
    res.cookie("refreshToken", refreshToken, cookieConfig);
    await User.findByIdAndUpdate(findUser._id, {
      refreshToken,
    });
    req.user = {
      message: "Login Successful",
      status: OK,
      data: {
        token,
        user: {
          ...findUser,
          hash: undefined,
        },
      },
    };
    next();
  } catch (error) {
    next(error);
  }
});

const refresh = AsyncHandler(async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    const findUser = await User.findOne({ refreshToken }).select(
      "email fullName avatar phone"
    );
    if (!findUser) {
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
        sameSite: "None",
      });
      throw new ForbiddenRequestError("Invalid Refresh - User logged out");
    }
    const token = await signToken(findUser._id);
    req.user = {
      message: "Successful",
      status: OK,
      data: {
        token,
        user: findUser,
      },
    };
    next()
  } catch (error) {
    next(error);
  }
});

const logout = AsyncHandler(async (req, res, next) => {
  try {
    const { userId } = req;
    await validateDbId(userId);
    await User.findByIdAndUpdate(userId, { refreshToken: " " });
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    req.user = {
      message: "User logged out",
      status: OK,
    };
    next()
  } catch (error) {
    next(error);
  }
});

const handleGoogleAuth = AsyncHandler(async (req, res, next) => {
  try {
    const user = req.user;
    // sign access and refresh token to keep a user logged in
    const token = await signToken(user._id);
    const refreshToken = await signRefreshToken(user._id);

    const myUser = await User.findByIdAndUpdate(
      user._id,
      { refreshToken },
      { new: true }
    )
      .lean()
      .select("email fullName avatar phone");

    res.cookie("refreshToken", refreshToken, cookieConfig);

    req.user = {
      message: "Login Successful",
      status: OK,
      data: {
        token,
        user: myUser,
      },
    };
    next();
  } catch (error) {
    next(error);
  }
});

// const handleAppleAuth = AsyncHandler(async (req, res, next) => {
//   try {
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = {
  register,
  login,
  refresh,
  logout,
  // handleAppleAuth,
  handleGoogleAuth,
};
