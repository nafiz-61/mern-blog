const blogModel = require("../models/blog.model");
const { validateBody } = require("../helpers/validator");
const fs = require("fs");
const path = require("path");
const { findByIdAndDelete } = require("../models/user.model");

exports.createBlog = async (req, res) => {
  try {
    const { empty, fieldName } = validateBody;
    if (empty) {
      return res.status(401).json({
        msg: `${fieldName} is missing`,
      });
    }

    const isExist = await blogModel.findOne({ blogTitle: req.body.blogTitle });
    if (isExist) {
      return res.status(401).json({
        msg: `${isExist.blogTitle} already exists, try another one`,
      });
    }

    const saveBlog = await new blogModel({
      blogTitle: req.body.blogTitle,
      blogDescription: req.body.blogDescription,
      image: `http://localhost:3000/static/${req.file.filename}`,
    }).save();

    if (!saveBlog) {
      return res.status(501).json({
        msg: "Failed to save blog",
      });
    }

    return res.status(201).json({
      msg: "Blog created successfully",
      data: saveBlog,
    });
  } catch (error) {
    console.log("Error from createBlog controller", error);
    return res.status(501).json({
      msg: "Error from createBlog controller",
      error: error.message,
    });
  }
};

// getAllBlogs

exports.getAllBlogs = async (req, res) => {
  try {
    const allblog = await blogModel.find();
    res.status(201).json({
      msg: "blog created successfully",
      data: allblog,
    });
  } catch (error) {
    console.log(`Error from getAllBlogs controller`, error);
    return res.status(501).json({
      msg: "Error from getAllBlogs controller",
      error: error,
    });
  }
};

// getSingleBlog
exports.getSingleBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const findBlog = await blogModel.findById(id);
    res.status(201).json({
      msg: "single blog get succesfully",
      data: findBlog,
    });
  } catch (error) {
    console.log(`Error from  getSingleBlog controller`, error);
    return res.status(501).json({
      msg: "Error from  getSingleBlog controler",
      error: error,
    });
  }
};

// update blog
exports.getUpdateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { blogTitle, blogDescription } = req.body;
    // const image = req.file;

    //check the blog already exist or not
    const Blog = await blogModel.findById(id);

    // blogTitle
    if (req.body.blogTitle) {
      Blog.blogTitle = req.body?.blogTitle;
    } else {
      Blog.blogTitle;
    }

    // blogDescription

    if (req.body.blogDescription) {
      Blog.blogDescription = req.body?.blogDescription;
    } else {
      Blog.blogDescription;
    }

    // image

    if (req.file) {
      //old image
      const part = Blog.image.split("/");
      const targetpath = path.join("public", "temp", part[part.length - 1]);
      fs.unlinkSync(targetpath);

      //new image save
      Blog.image = `http://localhost:3000/static/${req?.file?.filename}`;
    } else {
      Blog.image = Blog.image;
    }

    await Blog.save();
    return res.status(201).json({
      msg: "Single Blog updated successfully",
      data: Blog,
    });
  } catch (error) {
    console.log("Error from getUpdateBlog controller", error);
    return res.status(501).json({
      msg: "Error from getUpdateBlog controller",
      error: error,
    });
  }
};

// delete blog
exports.deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await blogModel.findOne({ _id: id });
    console.log(item);
    if (!item) {
      return res.status(501).json({
        msg: "blog not found",
      });
    }
    const part = item.image.split("/");
    const targetpath = path.join("public", "temp", part[part.length - 1]);
    fs.unlinkSync(targetpath);
    const deleteItem = await blogModel.findByIdAndDelete(id);
    return res.status(201).json({
      msg: "single blog delete successfully",
      data: deleteItem,
    });
  } catch (error) {
    console.log(`Error from deleteBlog controller`, error);
    return res.status(501).json({
      msg: "Error from deleteBlog controller",
      error: error,
    });
  }
};



