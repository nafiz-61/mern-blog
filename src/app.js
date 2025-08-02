const express = require("express");
const path = require("path");
const userController = require("../src/controller/user.controller");
const categoryController = require("./controller/category.controller");
const blogController = require("./controller/blog.controller");
const upload = require("./middleware/multer.middlware");
const cors = require("cors");
require("dotenv").config();
const app = new express();

// user middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/registration", userController.registration);
app.post("/login", userController.login);

// category routes
app.post("/create-category", categoryController.createCategory);
app.get("/getallcategory", categoryController.getAllcategory);
app.get("/single-category/:name", categoryController.getSingleCategory);
app.put("/update-category/:id", categoryController.updatecategory);
app.delete("/delete-category/:id", categoryController.deleteCategory);

// blog routes
app.post("/create-blog", upload.single("image"), blogController.createBlog);
app.get("/getallblog", blogController.getAllBlogs);
app.get("/singleBlog/:id", blogController.getSingleBlog);
app.put(
  "/update-blog/:id",
  upload.single("image"),
  blogController.getUpdateBlog
);

app.delete("/delete-blog/:id", blogController.deleteBlog);

app.use("/static", express.static("public/temp"));
module.exports = { app };
