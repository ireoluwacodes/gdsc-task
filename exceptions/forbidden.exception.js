const status = require("http-status");

class ForbiddenRequestError extends Error {
  statusCode = status.FORBIDDEN;
  name = "FORBIDDEN_REQUEST_ERROR";

  constructor(message) {
    super(message || "This request is FORBIDDEN");
  }
}

module.exports = ForbiddenRequestError;
