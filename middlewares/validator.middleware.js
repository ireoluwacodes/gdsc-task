const { BAD_REQUEST } = require("http-status");

const validator = (schema) => async (req, res, next) => {
  try {
    const { body } = req;
    await schema.validateAsync(body);
    next();
  } catch (error) {
    res.status(BAD_REQUEST);
    next(error);
  }
};

module.exports = validator;
