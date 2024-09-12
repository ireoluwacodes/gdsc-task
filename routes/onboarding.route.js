const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const {
  addWorkExperience,
  updateWorkExperience,
} = require("../controllers/onboarding.controller");
const successHandler = require("../middlewares/success.middleware");
const validator = require("../middlewares/validator.middleware");
const { addWorkExperienceSchema } = require("../validators/job/add.schema");

const onboardingRouter = Router();

onboardingRouter
  .route("/experience")
  .post(
    authMiddleware,
    validator(addWorkExperienceSchema),
    addWorkExperience,
    successHandler
  );

onboardingRouter
  .route("/experience/update/:id")
  .patch(
    authMiddleware,
    validator(updateWorkExperience),
    updateWorkExperience,
    successHandler
  );

module.exports = onboardingRouter;
