import { Types } from "mongoose";

export interface ICategory {
  _id: Types.ObjectId;
  name: string;
  icon: string;
  parent: {};
  ancestors: [{}];
  status?: boolean;
}

export interface ICategoryCreateUpdate {
  name: string;
  icon: string;
  parent: {};
  ancestors: [{}];
  status?: boolean;
}
