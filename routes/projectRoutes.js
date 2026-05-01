const express = require("express");
const router = express.Router();

const {
  createProject,
  getProjects,
  addMember,
} = require("../controllers/projectController");

const { protect } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/roleMiddleware");

router.post("/", protect, isAdmin, createProject);
router.get("/", protect, getProjects);
router.post("/add-member", protect, isAdmin, addMember);

module.exports = router;