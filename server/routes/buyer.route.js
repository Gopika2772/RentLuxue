const express = require("express");
const { buyerRegister, buyerLogin } = require("../controllers/buyer.auth.controller");
const { getPropertiesByCity, getOwnerDetails } = require("../controllers/buyer.post.controller");



const router = express.Router();


router.route("/buyerRegister").post(buyerRegister);
router.route("/buyerLogin").post(buyerLogin);
router.get("/city/:city", getPropertiesByCity);
router.get("/owner/:user_id", getOwnerDetails);
module.exports = router; 