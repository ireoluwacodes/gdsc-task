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
  .route("/experience/:id")
  .patch(
    authMiddleware,
    validator(updateWorkExperience),
    updateWorkExperience,
    successHandler
  );

onboardingRouter
  .route("/experience/:id")
  .delete(authMiddleware, deleteWorkExperience, successHandler);

onboardingRouter.route("/experience").get(authMiddleware, getWorkExperiences);

onboardingRouter.route("/skills/:id").post(authMiddleware, addSkills);

onboardingRouter.route("/skills").get(authMiddleware, getAllSkills);

onboardingRouter.route("/skills/user").post(authMiddleware, getMySkills);

onboardingRouter.route("/skills/:id").delete(authMiddleware, deleteSkill);

module.exports = onboardingRouter;
