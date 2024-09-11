const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
const Skill = mongoose.model("Skill", skillSchema);

module.exports = {
  Skill,
};
