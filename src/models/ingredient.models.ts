import { Schema, model } from "mongoose";
import { IIngredient } from "../types/ingredient.types";

const ingredientSchema: Schema = new Schema<IIngredient>({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  icon: {
    type: String,
    trim: true,
    required: true,
  },
});

export const Ingredient = model<IIngredient>("Ingredient", ingredientSchema);
