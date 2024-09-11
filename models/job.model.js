const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    location: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    companyName: {
      type: String,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    description: {
      type: String,
    },
    type: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
const Job = mongoose.model("Job", jobSchema);

module.exports = {
  Job,
};
