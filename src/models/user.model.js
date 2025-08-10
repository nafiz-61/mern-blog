const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
      min: [5, "atleast use 5 character"],
      max: [19, "atleast use 19 character"],
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    avatar: {
      type: String,
      trim: true,
      required: false,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    lastLogin: {
      type: Date,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },
    permanentAddress: {
      type: String,
      trim: true,
    },
    presentAddrees: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", userSchema);

