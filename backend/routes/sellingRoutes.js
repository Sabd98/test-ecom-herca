const express = require("express");
const router = express.Router();
const sellingController = require("../controllers/sellingController");

router.get("/", sellingController.getSellings);
router.get("/:id", sellingController.getSelling);

module.exports = router;
