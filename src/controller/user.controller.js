const userModel = require("../models/user.model");

//registration
exports.registration = async (req, res) => {
  try {
    const { userName, email, avatar, password, phoneNumber } = req.body;

    if (!userName) {
      return res.status(401).json({
        msg: "userName missing",
      });
    }
    if (!email) {
      return res.status(401).json({
        msg: "email missing",
      });
    }
    // if (!avatar) {
    //   return res.status(401).json({
    //     msg: "avatar missing",
    //   });
    // }
    if (!password) {
      return res.status(401).json({
        msg: "password missing",
      });
    }
    if (!phoneNumber) {
      return res.status(401).json({
        msg: "phoneNumber missing",
      });
    }

    const isExist = await userModel.findOne({ email: email });
    if (isExist) {
      return res.status(401).json({
        msg: `${email} Already exist`,
      });
    }

    // now save the data
    const newUser = await userModel.create({
      userName,
      email,
      // avatar,
      password,
      phoneNumber,
    });
    return res.status(201).json({
      msg: " Registration successfull",
      data: newUser,
    });
  } catch (error) {
    console.log(`error from user registraion controller`, error);
    res.status(501).json({
      msg: "error from user registraion controller",
      error: error,
    });
  }
};

// login
exports.login = async (req, res) => {
  try {
    console.log(req.body);
    const isExist = await userModel.findOne({
      $and: [{ email: req.body.email, password: req.body.password }],
    });
    console.log(isExist);
    if (!isExist) {
      return res.status(401).json({
        msg: "email/password invalid",
      });
    }
    return res.status(200).json({
      msg: "login successfull",
    });
  } catch (error) {
    console.log(`error from login `, error);
  }
};

//
