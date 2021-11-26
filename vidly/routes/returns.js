const express = require("express");
const router = express.Router();
const { setRental } = require("../controllers/returns");
const auth = require("../middleware/auth");
const { validateReturn } = require("../validations/validateReturn");
const { validate } = require("../middleware/validate");

router.post("/",[auth,validate(validateReturn)],setRental);

module.exports = router;