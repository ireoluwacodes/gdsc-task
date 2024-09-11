const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    avatar: {
      type: String,
    },
    phone: {
      type: String,
    },
    hash: {
      type: String,
    },
    loginScheme: {
      type: String,
      required: true,
      enum: ["email", "google", "apple"],
    },
    jobs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
      },
    ],
    skills: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Skill",
      },
    ],
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
const User = mongoose.model("User", userSchema);

module.exports = {
  User,
};
