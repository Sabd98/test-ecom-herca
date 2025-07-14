const express = require("express");
const router = express.Router();
const commissionController = require("../controllers/commisionController");

router.get("/", commissionController.getCommissions);

module.exports = router;
