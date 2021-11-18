const { validate } = require("../validations/auth");
const { login } = require("../controllers/auth");
const express = require("express");
const router = express.Router();

router.post("/",[validate,login]);

module.exports = router;