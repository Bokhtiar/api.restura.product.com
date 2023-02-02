import { Schema, model } from "mongoose";
import { IProductCreateUpdate } from "../types/product.types";

const productSchema: Schema = new Schema<IProductCreateUpdate>(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    price: {
      type: String,
      trim: true,
      required: true,
    },
    components: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
      required: true,
    },
    cooking_time: {
      type: String,
      trim: true,
    },
    offer_start: {
      type: String,
      trim: true,
    },
    offer_end: {
      type: String,
      trim: true,
    },
    is_published: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Product = model<IProductCreateUpdate>("Product", productSchema);
