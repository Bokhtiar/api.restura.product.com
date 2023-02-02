import { Types } from "mongoose";

export interface IProduct {
  _id: Types.ObjectId;
  name: string;
  price: string;
  components: string;
  description: string;
  image: string;
  cooking_time: string;
  offer_start?: string;
  offer_end?: string;
  is_published: boolean;
}

export interface IProductCreateUpdate {
  name: string;
  price: string;
  components: string;
  description: string;
  image: string;
  cooking_time: string;
  offer_start?: string;
  offer_end?: string;
  is_published: boolean;
}
