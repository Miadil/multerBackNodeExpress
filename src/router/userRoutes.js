const express = require("express");

const { getOne, createOne } = require("../controller/userController");

const router = express.Router();

router.get("/:id", getOne);
router.post("/", createOne);

module.exports = router;
