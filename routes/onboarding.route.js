const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const {
  addWorkExperience,
  updateWorkExperience,
  deleteWorkExperience,
  getWorkExperiences,
  addSkills,
  getAllSkills,
  getMySkills,
  deleteSkill,
} = require("../controllers/onboarding.controller");
const successHandler = require("../middlewares/success.middleware");
const validator = require("../middlewares/validator.middleware");
const { addWorkExperienceSchema } = require("../validators/job/add.schema");
const {
  updateWorkExperienceSchema,
} = require("../validators/job/update.schema");

const onboardingRouter = Router();

onboardingRouter.route("/experience").get(authMiddleware, getWorkExperiences);

onboardingRouter
  .route("/experience")
  .post(
    authMiddleware,
    validator(addWorkExperienceSchema),
    addWorkExperience,
    successHandler
  );

onboardingRouter
  .route("/experience/:id")
  .patch(
    authMiddleware,
    validator(updateWorkExperienceSchema),
    updateWorkExperience,
    successHandler
  );

onboardingRouter
  .route("/experience/:id")
  .delete(authMiddleware, deleteWorkExperience, successHandler);

onboardingRouter.route("/skills/:id").post(authMiddleware, addSkills);

onboardingRouter.route("/skills/all").get(authMiddleware, getAllSkills);

onboardingRouter.route("/skills/user").get(authMiddleware, getMySkills);

onboardingRouter.route("/skills/:id").delete(authMiddleware, deleteSkill);

module.exports = onboardingRouter;
