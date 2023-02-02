import { Types } from "mongoose";
import { Models } from "../../models";
import { IVariant, IVariantCreateUpdate } from "../../types/variant.type";

/* list of resource */
const findAll = async (): Promise<IVariant[] | []> => {
  return await Models.Variant.find();
};

/* store docuement */
const storeDocument = async ({
  documents,
}: {
  documents: IVariantCreateUpdate;
}): Promise<IVariant | null> => {
  const newVariant = new Models.Variant({
    ...documents,
  });

  return await newVariant.save();
};

/* specific resrouce findOneByKey */
const findOneByKey = async ({
  product,
  name,
}: {
  product: Types.ObjectId;
  name: string;
}): Promise<IVariant | null> => {
  return await Models.Variant.findOne({ product: product, name: name });
};

export const variantService = {
  findAll,
  storeDocument,
  findOneByKey,
};
