const express = require("express");
const { signup, login, getSettings, updateSettings, googleAuth, forgotPassword, resetPassword } = require("../controllers/user.controller");
const auth = require("../middlewares/auth.middleware");
const authRateLimiter = require("../middlewares/rateLimiter.middleware");
const router = express.Router();

router.post("/signup", authRateLimiter, signup);
router.post("/login", authRateLimiter, login);
router.post("/google", authRateLimiter, googleAuth);
router.post("/forgot-password", authRateLimiter, forgotPassword);
router.post("/reset-password/:token", authRateLimiter, resetPassword);

// Settings
router.get("/settings", auth, getSettings);
router.put("/settings", auth, updateSettings);

module.exports = router;
