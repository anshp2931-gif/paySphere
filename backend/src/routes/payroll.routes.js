const express = require("express");
const { finalizePayroll, getPayrollSummary } = require("../controllers/payroll.controller");
const auth = require("../middlewares/auth.middleware");
const router = express.Router();

router.post("/finalize", auth, finalizePayroll);
router.get("/summary", auth, getPayrollSummary);

module.exports = router;
