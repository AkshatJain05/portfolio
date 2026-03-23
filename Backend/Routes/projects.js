import express from "express";
import Project from "../Models/ProjectModel.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// ==================== Add Project ====================
router.post("/add-project", auth, async (req, res) => {
  try {
    const { title, description, codeLink, projectLink, tags, featured, image } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required",
      });
    }

    const project = await Project.create({
      title,
      description,
      codeLink,
      projectLink,
      image,
      featured: featured || false,
      tags: tags
        ? tags.split(",").map((tag) => tag.trim().toLowerCase())
        : [],
    });

    res.status(201).json({
      success: true,
      message: "Project added successfully",
      data: project,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ==================== Get All Projects (Search + Filter + Pagination) ====================
router.get("/", async (req, res) => {
  try {
    const { search, tag, page = 1, limit = 12 } = req.query;

    let query = {};

    //  Search (title, description, tags)
    if (search) {
      query.$text = { $search: search };
    }

    //  Filter by tag
    if (tag) {
      query.tags = tag.toLowerCase();
    }

    const projects = await Project.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Project.countDocuments(query);

    res.json({
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      data: projects,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ==================== Get Single Project ====================
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    res.json({ success: true, data: project });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ==================== Update Project ====================
router.put("/update/:id", auth, async (req, res) => {
  try {
    const { title, description, codeLink, projectLink, tags, featured, image } = req.body;

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        codeLink,
        projectLink,
        image,
        featured,
        tags: tags
          ? tags.split(",").map((tag) => tag.trim().toLowerCase())
          : [],
      },
      { new: true, runValidators: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    res.json({
      success: true,
      message: "Project updated successfully",
      data: updatedProject,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ==================== Delete Project ====================
router.delete("/delete/:id", auth, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    res.json({ success: true, message: "Project deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;