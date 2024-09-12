const AsyncHandler = require("express-async-handler");

const successHandler = AsyncHandler(async (req, res, next) => {
  return res.status(req.user.status).json({
    message: req.user.message,
    data: req.user.data,
  });
});

module.exports = successHandler