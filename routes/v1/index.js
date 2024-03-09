var express = require("express");
var router = express.Router();

router.use("/customers", require("./customers"));

module.exports = router;
