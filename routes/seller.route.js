const express = require("express");
// const { sellerRegister, sellerLogin } = require("../controller/seller.auth.controller");
// const { registerProperty, getProperty, updateProperty, deleteProperty, getIndivPost } = require("../controller/seller.post.controller");
const { sellerRegister, sellerLogin } = require("../controllers/seller.auth.controller");
const { registerProperty, getProperty, getIndivPost, updateProperty, deleteProperty } = require("../controllers/seller.post.controller");




const router = express.Router();


router.route("/sellerRegister").post(sellerRegister);
router.route("/sellerLogin").post(sellerLogin);
router.route("/prop").post(registerProperty);
router.route("/prop/:user_id").get(getProperty);
router.route("/prop/post/:post_id").get(getIndivPost);
router.route("/prop/:post_id").put(updateProperty);
router.route("/prop/:post_id").delete(deleteProperty);

module.exports = router;