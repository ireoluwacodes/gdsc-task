const Joi = require("joi");

module.exports.updateWorkExperienceSchema = Joi.object({
  title: Joi.string(),
  companyName: Joi.string(),
  location: Joi.string(),
  type: Joi.string().valid(
    "Agriculture",
    "Construction",
    "Education",
    "Energy",
    "Finance",
    "Healthcare",
    "Hospitality",
    "Information Technology",
    "Manufacturing",
    "Retail",
    "Telecommunications",
    "Transportation"
  ),
  startDate: Joi.date(),
  endDate: Joi.date().greater(Joi.ref("startDate")).messages({
    "date.greater": "End date must be after start date",
  }),
})
  .or("title", "companyName", "location", "type", "startDate", "endDate")
  .messages({
    "object.missing": "At least one field must be provided for the update",
  });
