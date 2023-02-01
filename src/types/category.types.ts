import { Types } from "mongoose";

export interface ICategory {
  _id: Types.ObjectId;
  name: string;
  slug: string;
  icon: string;
  image: string;
  status: boolean;
}

export interface ICategoryCreateUpdate {
  name: string;
  icon: string;
  slug: string;
  parent: {};
  ancestors: [{}];
  image: string;
  status?: boolean;
}
