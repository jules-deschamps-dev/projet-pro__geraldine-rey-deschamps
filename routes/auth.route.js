const express = require("express");
const router = express.Router();
const authCtrl = require("../controllers/auth.control");

//const multer = require("multer");

// AUTHENTIFICATION
router.post("/register", authCtrl.signup);
router.post("/login", authCtrl.login);
router.get("/logout", authCtrl.logout);

module.exports = router;
