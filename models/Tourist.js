import mongoose from "mongoose";
import { List } from "./List.js";

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
    },
    lists: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "List",
      }
    ],
  },      
  {
    timestamps: true,
  }
);

export const Tourist = mongoose.model("Tourist", touristSchema);