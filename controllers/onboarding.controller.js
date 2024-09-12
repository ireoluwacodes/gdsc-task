const { Job } = require("../models/job.model");
const { Skill } = require("../models/skill.model");
const { User } = require("../models/user.model");
const AsyncHandler = require("express-async-handler");
const { validateDbId } = require("../utils/mongoId.utils");
const { OK, CREATED } = require("http-status");
const ForbiddenRequestError = require("../exceptions/forbidden.exception");

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
    const { title, companyName, location, type, startDate, endDate } = req.body;
    const job = await Job.findByIdAndUpdate(
      id,
      { title, companyName, location, type, startDate, endDate },
      { new: true }
    );
    if (!job) throw new ForbiddenRequestError("Job experience not found");
    req.user = {
      message: "Experience updated",
      status: CREATED,
      data: job,
    };
    next();
  } catch (error) {
    next(error);
  }
});

const deleteWorkExperience = AsyncHandler(async (req, res, next) => {
  try {
    const { userId } = req;
    const { id } = req.params;
    await validateDbId(userId, id);
    const job = await Job.findByIdAndDelete(id);
    if (!job) throw new ForbiddenRequestError("Job experience not found");
    req.user = {
      message: "Experience deleted",
      status: OK,
      data: job,
    };
    next();
  } catch (error) {
    next(error);
  }
});

const getWorkExperiences = AsyncHandler(async (req, res, next) => {
  try {
    const { userId } = req;
    await validateDbId(userId);
    const experiences = await Job.find({ userId });
    req.user = {
      message: "Work Experience fetched",
      status: OK,
      data: experiences,
    };
    next();
  } catch (error) {
    next(error);
  }
});

const addSkills = AsyncHandler(async (req, res, next) => {
  try {
    const { userId } = req;
    const { id } = req.params;

    await validateDbId(userId, id);

    const skills = await User.findByIdAndUpdate(
      userId,
      { $push: { skills: id } },
      { new: true }
    )
      .select("skills")
      .populate("skills");
    req.user = {
      message: "User skills updated",
      status: OK,
      data: skills,
    };
    next();
  } catch (error) {
    next(error);
  }
});

const getAllSkills = AsyncHandler(async (req, res, next) => {
  try {
    const skills = await Skill.find({});

    req.user = {
      message: "Skills retrieved successfully",
      status: OK,
      data: skills,
    };
    next();
  } catch (error) {
    next(error);
  }
});

const getMySkills = AsyncHandler(async (req, res, next) => {
  try {
    const { userId } = req;
    await validateDbId(userId);
    const mySkills = await User.findById(userId)
      .select("skills")
      .populate("skills");
    req.user = {
      message: "User skills retrieved",
      status: OK,
      data: mySkills,
    };
    next();
  } catch (error) {
    next(error);
  }
});

const deleteSkill = AsyncHandler(async (req, res, next) => {
  try {
    const { userId } = req;
    const { id } = req.params;

    await validateDbId(userId, id);

    const skills = await User.findByIdAndUpdate(
      userId,
      { $pull: { skills: id } },
      { new: true }
    )
      .select("skills")
      .populate("skills");
    req.user = {
      message: "User skills updated",
      status: OK,
      data: skills,
    };
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = {
  addWorkExperience,
  updateWorkExperience,
  deleteWorkExperience,
  getWorkExperiences,
  addSkills,
  getAllSkills,
  getMySkills,
  deleteSkill,
};
