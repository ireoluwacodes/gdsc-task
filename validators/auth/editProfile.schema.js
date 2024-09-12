const Joi = require("joi");

module.exports.editProfileSchema = Joi.object({
  fullName: Joi.string(),
  userName: Joi.string(),
  dateOfBirth: Joi.date(),
  phone: Joi.string().min(11).max(14),
})
  .or("fullName", "userName", "dateOfBirth", "phone") // Ensures at least one field is present
  .messages({
    "object.missing": "At least one field must be provided for the update",
  });
