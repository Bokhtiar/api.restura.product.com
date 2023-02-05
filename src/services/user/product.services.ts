import { Models } from "../../models";
import { Types } from "mongoose";
import { IProduct } from "../../types/product.types";

/* findAll  */
const findAll = async (): Promise<IProduct[] | []> => {
  return await Models.Product.find({is_published: true});
};

/* findOneById */
const findOneById = async ({
  _id,
}: {
  _id: Types.ObjectId;
}): Promise<IProduct | null> => {
  return await Models.Product.findById({ _id });
};

export const userProductService = {
  findAll,
  findOneById,
};
