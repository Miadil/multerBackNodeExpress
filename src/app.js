require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");

const router = require("./router");
const app = express();

app.use(cors("*"));
app.use(express.json());
app.use(cookieParser());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "./public/images";
    //Dans ce code, fs.existsSync est utilisé pour vérifier si le répertoire existe.
    //S'il n'existe pas, fs.mkdirSync est utilisé pour le créer.
    //L'option { recursive: true } permet de créer tous les répertoires intermédiaires nécessaires.“
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}_${file.originalname}`);
  },
});
const upload = multer({ storage });

app.post("/upload", upload.files("file"), (req, res) => {
  console.log(req.body);
  console.log(req.file);
});

app.get("/", (req, res) => {
  res.status(200).send("on et la !");
});

app.use("/api", router);

app.get("*", (req, res) => {
  res.status(404).json({ message: "Not Found !" });
});

module.exports = app;
