import { Schema, model } from "mongoose";
import { IVariantCreateUpdate } from "../types/variant.type";

const variantSchema: Schema = new Schema<IVariantCreateUpdate>(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      trim: true,
      required: true,
    },
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
    image: {
      type: String,
      trim: true,
      required: true,
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

export const Variant = model<IVariantCreateUpdate>("Variant", variantSchema);
