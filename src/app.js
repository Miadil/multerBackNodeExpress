require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const multer = require("multer");

const router = require("./router");
const app = express();

app.use(cors("*"));
app.use(express.json());
app.use(cookieParser());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}_${file.originalname}`);
  },
});
const upload = multer({ storage });

app.post(
  "/upload",
  upload.fields([{ name: "image1" }, { name: "image2" }, { name: "image3" }]),
  (req, res) => {
    console.log("body", req.body);
    console.log("image1", req.files["image1"][0]);
    console.log("image2", req.files["image2"][0]);
    console.log("image3", req.files["image3"][0]);
  }
);

app.get("/", (req, res) => {
  res.status(200).send("on et la !");
});

app.use("/api", router);

app.get("*", (req, res) => {
  res.status(404).json({ message: "Not Found !" });
});

module.exports = app;
