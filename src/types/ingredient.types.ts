import { Types } from "mongoose";

export interface IIngredient {
  _id: Types.ObjectId;
  name: string;
  icon: string;
}
export interface IIngredientCreateUpdate {
  name: string;
  icon: string;
}
