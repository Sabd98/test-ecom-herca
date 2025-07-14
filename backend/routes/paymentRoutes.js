const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");

router.post("/", paymentController.createPayment);
router.get("/:selling_id", paymentController.getPaymentHistory);

module.exports = router;
