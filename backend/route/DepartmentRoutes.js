const express = require('express')
const { GetAllDepartment, AddDepartment, DeleteDepartment, EditDepartment, GetDepartment } = require('../controllers/departmentController')
const router = express.Router();

const authenticateToken = require("../middleware/authMiddleware");
router.use(authenticateToken);


//Onboardding users to department page
router.get("/", GetAllDepartment)
router.get("/:deptId", GetDepartment)
router.post("/", AddDepartment)
router.delete("/:deptId", DeleteDepartment)
router.put("/:deptId", EditDepartment)

module.exports = router