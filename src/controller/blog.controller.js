const blogModel = require("../models/blog.model");

exports.createBlog = async (req, res) => {
  try {
    console.log(req.file);
    
  } catch (error) {
    console.log(`error from createBlog controller`, error);
    return res.status(501).json({
      msg: "error from createBlog controller",
      error: error,
    });
  }
};
