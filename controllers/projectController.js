const Project = require("../models/Project");


exports.createProject = async (req, res) => {
  const { title, description } = req.body;

  try {
    const project = await Project.create({
      title,
      description,
      createdBy: req.user._id,
      members: [req.user._id], // admin included
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: "Error creating project" });
  }
};


exports.getProjects = async (req, res) => {
  try {
    let projects;

    if (req.user.role === "admin") {
      projects = await Project.find().populate("members", "name email");
    } else {
      projects = await Project.find({
        members: req.user._id,
      }).populate("members", "name email");
    }

    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Error fetching projects" });
  }
};


exports.addMember = async (req, res) => {
  const { projectId, userId } = req.body;

  try {
    const project = await Project.findById(projectId);

    if (!project.members.includes(userId)) {
      project.members.push(userId);
      await project.save();
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: "Error adding member" });
  }
};