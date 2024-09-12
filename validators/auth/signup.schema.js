const Joi = require("joi");

const createUserSchema = Joi.object({
  fullName: Joi.string().required(),
  password: Joi.string()
    .pattern(
      new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})")
    )
    .required()
    .messages({
      "string.pattern.base":
        "Password must have at least 8 characters, including an uppercase letter, a lowercase letter, a number, and a special character.",
      "string.empty": "Password is required.",
    }),
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
