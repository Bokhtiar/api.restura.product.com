import { Models } from "../../models";
import { Types } from "mongoose";
import { IProduct } from "../../types/product.types";
import { IVariant } from "../../types/variant.type";

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
  return await Models.Product.findById({ _id }).populate("category", "name");
};


/* product has assing variant product findAll */
const productHasAssingVariant = async({_id}: {_id:Types.ObjectId}) : Promise<IVariant[] | []> => {
  return await Models.Variant.find({product: _id, is_published: true})
}

export const userProductService = {
  findAll,
  findOneById,
  productHasAssingVariant
};
