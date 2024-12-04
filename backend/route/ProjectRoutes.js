const express = require('express')
const { GetAllProject, AddProject, DeleteProject, EditProject, GetProject } = require('../controllers/projectController')
const router = express.Router();

const authenticateToken = require("../middleware/authMiddleware");
router.use(authenticateToken);

//Onboardding users to Project page
router.get("/", GetAllProject)
router.get("/:projId", GetProject)
router.post("/", AddProject)
router.delete("/:projId", DeleteProject)
router.put("/:projId", EditProject)

module.exports = router