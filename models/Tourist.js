import mongoose from "mongoose";

const touristSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      unique: true,
      min: 5,
      max: 20,
    },
    lastname: {
      type: String,
      required: true,
      min: 10,
      max: 20,
    },
    emailid: {
        type: String,
        required: true,
        min: 10,
        max: 20,
    },
    phonenumber: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true
    }
  },
  {
    timestamps: true,
  }
);

export const Tourist = mongoose.model("Tourist", touristSchema);