import { Types } from "mongoose";

export interface IVariant {
  _id: Types.ObjectId;
  product: Types.ObjectId;
  name: string;
  price: string;
  image: string;
  is_published: boolean;
}

export interface IVariantCreateUpdate {
  product: Types.ObjectId;
  name: string;
  price: string;
  image: string;
  is_published: boolean;
}
