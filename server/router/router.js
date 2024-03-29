const express = require("express");
const multer = require("multer");
const route = express.Router();
const controller = require("../controller/controller");
const userdata = require("../middleware/userdata");

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "uploads/");
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({
  storage: storage,
});

// Home Router
route.get("/", (req, res) => {
  res.render("index", { user: req.session.email });
});

// Login Router
route.get("/login", (req, res) => {
  if (req.session.email) {
    res.render("index", { user: req.session.email });
  } else {
    res.render("login", { user: req.session.email });
  }
});

// Upload Router
route.get("/upload", (req, res) => {
  if (req.session.email) {
    res.render("upload", { user: req.session.email });
  } else {
    res.render("index", { user: req.session.email });
  }
});

// Profile Router
route.get("/profile", (req, res) => {
  if (req.session.email) {
    res.render("profile", { user: req.session.email });
  } else {
    res.render("index", { user: req.session.email });
  }
});

// User Image
route.get("/userimage", (req, res) => {
  if (req.session.email) {
    res.render("userimage", { user: req.session.email });
  } else {
    res.render("index", { user: req.session.email });
  }
});

// API Key
route.get("/apikey", (req, res) => {
  if (req.session.email) {
    res.render("apikey", {
      user: req.session.email,
      API_KEY: req.session.apikey,
    });
  } else {
    res.render("index", { user: req.session.email });
  }
});

// Router API
route.get("/api", (req, res) => {
  res.render("api", { user: req.session.email, API_KEY: req.session.apikey });
});

// API's
route.post("/api/register", controller.register);
route.post("/api/login", controller.login);
route.get("/api/logout", controller.logout);
route.post("/api/userdetail", userdata, controller.userdetail);
route.post("/api/passwordupdate", userdata, controller.auth);
route.post("/api/userimage", userdata, controller.userimage);
// ======
route.post("/api/userimagedelete", userdata, controller.userimagedelete);

route.post("/api/uploadimage", userdata, upload.any(), controller.uploadimage);

route.post(
  "/api/profileimageupload",
  userdata,
  upload.any(),
  controller.profileimageupload
);

route.post("/api/fetchimage", controller.fetchimage);

route.get("/api/apikey/:key", controller.apikey);

module.exports = route;
