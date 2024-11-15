import Project from "../models/project.model.js";

const testProject = async (req, res) => {
  const body = req.body;

  const validatedUser = req.user;

  console.log("the validated user => ", validatedUser);

  return res.status(200).json({
    success: true,
    message: "Project added",
    testproject: body,
  });
};

const createProject = async (req, res) => {
  try {
    const body = req.body;
    const validatedUser = req.user;

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
      createdby: validatedUser?._id,
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

const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;
    const body = req.body;

    console.log("the valid user => ", user);

    console.log("the id of the project => ", id);

    const projectExists = await Project.findById(id).exec();
    console.log("the existing project => ", projectExists);

    if (!projectExists) {
      res.status(404).json({
        success: false,
        message: "Project not found",
      });
      return;
    }

    console.log("the existing project => ", projectExists);

    // check if the user is authorized to update project

    const check = projectExists?.createdby === user?._id.toHexString();

    if (!check) {
      res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
      return;
    }

    // update the project
    const updatedProject = await Project.findByIdAndUpdate(
      projectExists?._id,
      body,
      {
        new: true,
      }
    ).exec();

    if (!updateProject) {
      res.status(403).json({
        success: false,
        message: "Project not updated",
      });
      return;
    }

    res.status(201).json({
      success: true,
      message: "Project updated",
      updatedProject,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({}).exec();

    if (projects?.length === 0) {
      res.status(404).json({
        success: false,
        message: "No projects for now",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "All projects",
      projects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
const getProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id).exec();

    if (!project) {
      res.status(404).json({
        success: false,
        message: "Project not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Project found",
      project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;

    console.log("the valid user => ", user);

    console.log("the id of the project => ", id);

    const projectExists = await Project.findById(id).exec();
    console.log("the existing project => ", projectExists);

    if (!projectExists) {
      res.status(404).json({
        success: false,
        message: "Project not found",
      });
      return;
    }

    console.log("the existing project => ", projectExists);

    // check if the user is authorized to update project

    const check = projectExists?.createdby === user?._id.toHexString();

    if (!check) {
      res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
      return;
    }

    // update the project
    const deletedProject = await Project.findByIdAndDelete(
      projectExists?._id
    ).exec();

    if (!deletedProject) {
      res.status(403).json({
        success: false,
        message: "Project not deleted",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Project deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export {
  createProject,
  updateProject,
  getProjects,
  getProject,
  deleteProject,
  testProject,
};
