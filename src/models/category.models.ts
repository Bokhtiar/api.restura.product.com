import { Schema, model, Types } from "mongoose";
import { ICategoryCreateUpdate } from "src/types/category.types";

const categorySchema: Schema = new Schema<ICategoryCreateUpdate>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  icon: {
    type: String,
    required: true,
    trim: true,
  },
  parent: {
    type: Types.ObjectId,
    default: null,
    ref: "Category",
  },
  ancestors: [
    {
      _id: {
        type: Types.ObjectId,
        ref: "Category",
      },
      name: String,
    },
  ],
  is_published: {
    type: Boolean,
    default: true,
  },
});

export const Category = model<ICategoryCreateUpdate>(
  "Category",
  categorySchema
);
