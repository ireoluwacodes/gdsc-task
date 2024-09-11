const status = require("http-status");

 class BadRequestError extends Error {
  statusCode = status.BAD_REQUEST;
  name = "BAD_REQUEST_ERROR";

  constructor(message) {
    super(message || "Bad Request");
  }
};

module.exports = BadRequestError