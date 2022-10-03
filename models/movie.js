import mongoose from "mongoose";
import { APP_URL } from "../config";

const Schema = mongoose.Schema;

const movieSchema = new Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    description: { type: String, required: true },
    image: {
      type: String,
      required: true,
      get: (image) => {
        return `${APP_URL}/${image}`;
      },
    },
  },
  { timestamps: true, toJSON: { getters: true } }
);

export default mongoose.model("Movie", movieSchema, "movies");
