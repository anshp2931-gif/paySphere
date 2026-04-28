const express = require("express");
const { addEmployee, getEmployees, getRecentEmployees } = require("../controllers/employee.controller");
const auth = require("../middlewares/auth.middleware");
const router = express.Router();

router.post("/", auth, addEmployee);
router.get("/", auth, getEmployees);
router.get("/recent", auth, getRecentEmployees);

module.exports = router;
