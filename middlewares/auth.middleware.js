const AsyncHandler = require("express-async-handler");
const { verifyToken } = require("../utils/token.utils");
const ForbiddenRequestError = require("../exceptions/forbidden.exception");
const UnauthorizedRequestError = require("../exceptions/badRequest.exception");
const { JsonWebTokenError } = require("jsonwebtoken");

const authMiddleware = AsyncHandler(async (req, res, next) => {
  try {
    const [scheme, token] = req.headers.authorization.split(" ");
    if (scheme == "Bearer") {
      if (!token || token == "") {
        throw new UnauthorizedRequestError(
          "Invalid token, pass token as a Bearer in authorization headers"
        );
      } else {
        try {
          let id = await verifyToken(token);
          req.userId = id;
          next();
        } catch (error) {
          throw new JsonWebTokenError("Could not verify token", error);
        }
      }
    } else {
      throw new ForbiddenRequestError(
        "Invalid token, pass token as a Bearer in authorization headers"
      );
    }
  } catch (error) {
    next(error);
  }
});

module.exports = authMiddleware;
