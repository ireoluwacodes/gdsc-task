const Joi = require("joi");

module.exports.addWorkExperienceSchema = Joi.object({
  experience: Joi.array()
    .items(
      Joi.object({
        title: Joi.string().required(),
        companyName: Joi.string().required(),
        location: Joi.string().required(),
        type: Joi.string()
          .valid(
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
          )
          .required(),
        startDate: Joi.date().required(),
        endDate: Joi.date().greater(Joi.ref("startDate")).required().messages({
          "date.greater": "End date must be after start date",
        }),
      })
    )
    .min(1)
    .required(),
});
