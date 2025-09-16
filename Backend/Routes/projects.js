// routes/projectRoutes.js

import express from "express";
import Project from "../Models/ProjectModel.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// ==================== Add Project ====================
router.post("/add-project", auth, async (req, res) => {
  try {
    const { title, description, codeLink, projectLink } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: "Title and description are required" });
    }

    const project = new Project({ title, description, codeLink, projectLink });
    await project.save();

    res.status(201).json({ message: "Project added successfully", project });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==================== Get All Projects ====================
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==================== Delete Project ====================
router.delete("/delete/:id", auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: "Project not found" });

    await project.deleteOne();
    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
