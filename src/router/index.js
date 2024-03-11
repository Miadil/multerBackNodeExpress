const express = require("express");

const router = express.Router();

const movieRoutes = require("./movieRoutes");
const userRoutes = require("./userRoutes");
const authRoutes = require("./authRoutes");

const authorization = require("../middleware/auth");

router.get("/", (req, res) => {
  res.status(200).send("on et la ! /api");
});

router.use("/movie", authorization, movieRoutes);
router.use("/user", userRoutes);
router.use("/auth", authRoutes);

module.exports = router;
