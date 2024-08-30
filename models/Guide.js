import mongoose from "mongoose";
import { List } from "./List.js";

const guideSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      unique: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    emailid: {
      type: String,
      required: true,
    },
    phonenumber: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
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

export const Guide = mongoose.model("Guide", guideSchema);
