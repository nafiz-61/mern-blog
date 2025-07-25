const { json } = require("express");
const { validateBody } = require("../helpers/validator");
const categoryModel = require("../models/category.model");
const { login } = require("./user.controller");

/**
 * @desc creaete category
 */
exports.createCategory = async (req, res) => {
  try {
    const { emptyBody, fieldName } = validateBody(req);
    if (emptyBody) {
      res.status(401).json({
        msg: `${fieldName} missing`,
      });
    }

    // isExist category name
    const isExist = await categoryModel.findOne({
      categoryName: req.body.categoryName,
    });
    if (isExist) {
      return res.status(401).json({
        msg: `${isExist.categoryName} already exist try another one`,
      });
    }

    // save the category into db
    const category = await new categoryModel({
      categoryName: req.body.categoryName,
      categoryDescription: req.body.categoryDescription,
    }).save();

    if (!category) {
      return res.status(401).json({
        msg: ` ${req.body.categoryName} created failed`,
      });
    }
    return res.status(201).json({
      msg: `${req.body.categoryName} created successfully`,
    });
  } catch (error) {
    console.log(`error from create category controller`, error);
    return res.status(401).json({
      msg: "error from create category controller",
      error: error,
    });
  }
};

/**
 * @desc getallcategory
 *
 */
exports.getAllcategory = async (_, res) => {
  try {
    const allcategory = await categoryModel.find({});
    if (!allcategory) {
      return res.status(401).json({
        msg: `category not found`,
      });
    }
    return res.status(200).json({
      msg: "category get successfully",
      data: allcategory,
      status: 200,
    });
  } catch (error) {
    console.log(`error from create category controller`, error);
    return res.status(401).json({
      msg: "error from create category controller",
      error: error,
    });
  }
};

/**
 * @desc getSingleCategory
 *
 */

exports.getSingleCategory = async (req, res) => {
  try {
    const { name } = req.params;
    if (!name) {
      return res.status(401).json({
        msg: "`category Name missing",
      });
    }

    const category = await categoryModel.findOne({ categoryName: name });
    if (!category) {
      return res.status(404).json({
        msg: "category not found",
      });
    }
    return res.status(200).json({
      msg: "category get successfull",
      data: category,
      status: "ok",
    });
  } catch (error) {
    console.log(`error from getSingleCategory controller`, error);
    return res.status(401).json({
      msg: "error from create getSingleCategory controller",
      error: error,
    });
  }
};

// @desc updareCategory

exports.updatecategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categoryModel.findOne({ _id: id });
    category.categoryName = req.body.categoryName || category.categoryName;
    category.categoryDescription =
      req.body.categoryDescription || category.categoryDescription;

    // save the new updated item
    await category.save();
    return res.status(200).json({
      msg: "category note found",
      data: category,
    });
  } catch (error) {
    console.log(`Error from updateCategory controller`, error);
    return res.status(401).json({
      msg: "error from create updateCategory controller",
      error: error,
    });
  }
};

//@desc deleteCategory

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await categoryModel.findOneAndDelete({ _id: id });
    if (!deletedItem) {
      return res.status(401).json({
        msg: "category not found",
      });
    }
    return res.status(200).json({
      msg: "category deleted succesfully",
      data: deletedItem,
    });
  } catch (error) {
    console.log(` error from deleteCategory controller`, error);
    return res.status(401).json({
      msg: "error from create deleteCategory controller",
      error: error,
    });
  }
};
