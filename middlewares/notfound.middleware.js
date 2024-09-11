const AsyncHandler = require("express-async-handler");
const ResourceNotFoundError = require("../exceptions/notFound.exception")
const notFound = AsyncHandler(async (req, res, next) => {
  try {
    throw new ResourceNotFoundError(`Route not found : ${req.method} : ${req.originalUrl}`);
  } catch (error) {
    next(error);
  }
});

module.exports = notFound;
