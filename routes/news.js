const newsController = require("../controllers/newsController");
const permission = require("../permissions");
const express = require('express');
const router = express.Router();

// Create News program (admin & staff)
router.post("/", permission.is_adminOrStaff, newsController.createNews);
// Get all News
router.get("/", newsController.getAllNews);
//Get by Id (admin & staff)
router.get("/:id", newsController.getById);
// Get My News
router.get("/user/me", permission.is_adminOrStaff, newsController.getMyNews);
// Remove News
router.delete("/:id", permission.is_adminOrStaff, newsController.removeNews);
// Update News (admin & staff)
router.put("/:id", permission.is_adminOrStaff, newsController.updateNews);
module.exports = router;
