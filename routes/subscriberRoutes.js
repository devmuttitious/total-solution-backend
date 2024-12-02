const express = require("express");
const router = express.Router();
const { subscribeNewsletter } = require("../controllers/subscriberController");

router.post("/subscribe", subscribeNewsletter);

module.exports = router;