const status = require("http-status");

class UnauthorizedRequestError extends Error {
  statusCode = status.UNAUTHORIZED;
  name = "UNAUTHORIZED_REQUEST_ERROR";

  constructor(message) {
    super(message || "This request is UNAUTHORIZED");
  }
}

module.exports = UnauthorizedRequestError;
