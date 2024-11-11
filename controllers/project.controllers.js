import Project from "../models/project.model.js";

const createProject = async (req, res) => {
  try {
    const body = req.body;

    if (!body.title || !body.description || !body.image) {
      res.status(400).json({
        success: false,
        message: "All fields required",
      });
      return;
    }

    // check if project exists
    const projectExists = await Project.findOne({
      title: body.title.trim(),
    }).exec();

    if (projectExists) {
      res.status(409).json({
        success: false,
        message: "Project exists, consider updating",
      });
      return;
    }

    //   creating the project
    const newProject = await Project.create({
      title: body.title.trim(),
      description: body.description,
      image: body.image,
    });

    if (newProject) {
      res.status(201).json({
        success: true,
        message: "Project added",
        project: newProject,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Project not added",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const updateProject = async (req, res) => {};

const getProjects = async (req, res) => {};
const getProject = async (req, res) => {};
const deleteProject = async (req, res) => {};

export { createProject, updateProject, getProjects, getProject, deleteProject };
