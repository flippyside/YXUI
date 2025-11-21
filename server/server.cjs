const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();
const cors = require("cors");

const uploadDir = path.join(__dirname, "upload");

const upload = multer({ dest: uploadDir });

app.use(cors());

app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("no files upload");
  }
  res.send("file uploaded successfully");
});

app.listen(4000, () => {
  console.log("server start");
});
