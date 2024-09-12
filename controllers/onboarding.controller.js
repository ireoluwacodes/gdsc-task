const { Job } = require("../models/job.model");
const { Skill } = require("../models/skill.model");
const { User } = require("../models/user.model");
const AsyncHandler = require("express-async-handler");
const { validateDbId } = require("../utils/mongoId.utils");
const { OK } = require("http-status");

const addWorkExperience = AsyncHandler(async (req, res, next) => {
  try {
    const { userId } = req;
    await validateDbId(userId);
    const { experience } = req.body;
    const experienceArr = experience.map((job) => ({
      ...job,
      userId: userId,
    }));
    const jobs = await Job.create(experienceArr);
    req.user = {
      message: "Experience added successfully",
      status: OK,
      data: jobs,
    };
    next();
  } catch (error) {
    next(error);
  }
});

const updateWorkExperience = AsyncHandler(async (req, res, next) => {
  try {
    const { userId } = req;
    const { id } = req.params;
    await validateDbId(userId, id);
    const {} = req.body

  } catch (error) {
    next(error);
  }
});



module.exports = {
  addWorkExperience,
  updateWorkExperience,
};
