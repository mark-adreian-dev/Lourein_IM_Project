const express = require('express')
const { GetAllEmployee, AddEmployee, DeleteEmployee, EditEmployee, GetEmployee} = require('../controllers/employeeController')
const router = express.Router();

const authenticateToken = require("../middleware/authMiddleware");
// router.use(authenticateToken);

//Onboardding users to Employee page
router.get("/", GetAllEmployee)
router.get("/:employeeId", GetEmployee)
router.post("/", AddEmployee)
router.delete("/:employeeId", DeleteEmployee)
router.put("/:employeeId", EditEmployee)

module.exports = router