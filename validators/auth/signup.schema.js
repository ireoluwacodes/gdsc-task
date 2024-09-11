const Joi = require("joi");

const createUserSchema = Joi.object({
  fullName: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string()
    .required()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "ng", "net", "gov"] },
    }),
  phone: Joi.string().required().min(11).max(14),
});

module.exports = {
  createUserSchema,
};
