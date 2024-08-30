import mongoose from "mongoose";
import { Tourist } from "./Tourist.js";
import { Guide } from "./Guide.js";

const listSchema = new mongoose.Schema(
  {
    listTitle: {
      type: String,
      required: true,
    },
    guideData: {
      guide: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Guide",
        required: true,
      },
      location: {
        type: String,
        required: true,
      },

      specialities: {
        type: [String],
        required: true,
      },
      experience: {
        type: String,
        required: true,
      },
    },
    touristData: [
      {
        tourist: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Tourist",
        },
        datefrom: {
          type: Date,
        },
        dateto: {
          type: Date,
        }
      },
    ],
    liststatus: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const List = mongoose.model("List", listSchema);
