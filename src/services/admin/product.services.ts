import { IProduct, IProductCreateUpdate } from "../../types/product.types";
import { Models } from "../../models";
import { Types } from "mongoose";
import { ingredientService } from "./ingredient.services";

/* findAll resurce */
const findAll = async (): Promise<IProduct[] | []> => {
  return await Models.Product.find();
};

/* specific resoruce findOneByKey */
const findOneByKey = async (params: any): Promise<IProduct | null> => {
  return await Models.Product.findOne({ ...params });
};

/* store documents */
const storeDocuments = async ({
  documents,
}: {
  documents: IProductCreateUpdate;
}): Promise<IProduct | null> => {
  const newProduct = new Models.Product({
    ...documents,
  });
  return await newProduct.save();
};

/* specific resource findOneByID */
const findOneByID = async ({
  _id,
}: {
  _id: Types.ObjectId;
}): Promise<IProduct | null> => {
 return await Models.Product.findById({ _id });
};

/* specific resoruce findOneByUPdate */
const findOneByIdAndUpdate = async ({
  _id,
  documents,
}: {
  _id: Types.ObjectId;
  documents: IProductCreateUpdate;
}): Promise<IProduct | null> => {
  return await Models.Product.findByIdAndUpdate(_id, {
    $set: { ...documents },
  });
};

/* specific resrouce delete */
const findOneByIDdAndDelete = async ({
  _id,
}: {
  _id: Types.ObjectId;
}): Promise<IProduct | null> => {
  return await Models.Product.findByIdAndDelete({ _id });
};

/* specefic resoruce publishedUnpublished */
const publishedUnpublished = async ({
  _id,
  is_published,
}: {
  _id: Types.ObjectId;
  is_published: boolean;
}): Promise<IProduct | null> => {
  return await Models.Product.findByIdAndUpdate(_id, {
    $set: { is_published: !is_published },
  });
};

export const productServices = {
  findAll,
  findOneByID,
  findOneByKey,
  storeDocuments,
  publishedUnpublished,
  findOneByIdAndUpdate,
  findOneByIDdAndDelete,
};
