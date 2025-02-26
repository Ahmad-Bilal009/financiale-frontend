const express = require("express");
const router = express.Router();
const visitorController = require("../controllers/visitorController");
const { verifyToken } = require("../middleware/authMiddleware");




router.post("/increment/:productId", visitorController.incrementVisitor);
router.get("/total", visitorController.getTotalVisitors);
router.get("/product/:productId", visitorController.getProductVisitors);
router.get("/user/:userId", visitorController.getUserVisitors);
router.get("/sorted", visitorController.getSortedVisitors);

module.exports = router;
