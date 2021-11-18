const { validate } = require("../validations/user");
const { userInfo, setUser } = require("../controllers/user");
const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();


router.get("/me",[auth,userInfo]);

router.post("/",[validate,setUser]);

module.exports = router;