const express = require('express')
const { GetAllTask, AddTask, DeleteTask, EditTask, GetTask } = require('../controllers/taskController')
const router = express.Router();

const authenticateToken = require("../middleware/authMiddleware");
router.use(authenticateToken);

//Onboardding users to Task page
router.get("/:projId", GetAllTask)
router.get("/:taskId/item", GetTask)
router.post("/:projId", AddTask)
router.delete("/:projId", DeleteTask)
router.put("/:projId", EditTask)

module.exports = router