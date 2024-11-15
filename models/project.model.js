import mongoose from "mongoose";

const ProjectSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "please add a title"],
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    createdby: {
      type: String,
      required: [true, "please connect a user"],
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Project", ProjectSchema);

export default Project;
