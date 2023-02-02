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

/* specific resoruce findOneById */
const findOneById = async ({
  _id,
}: {
  _id: Types.ObjectId;
}): Promise<IVariant | null> => {
  return await Models.Variant.findById({ _id });
};

/*specific resoruce findOneByIdAndUpdate */
const findOneByIdAndUpdate = async ({
  _id,
  documents,
}: {
  _id: Types.ObjectId;
  documents: IVariantCreateUpdate;
}) => {
  return await Models.Variant.findByIdAndUpdate(_id, {
    $set: { ...documents },
  });
};

/* specific resoruce delete */
const findOneByIdAndDelete = async ({
  _id,
}: {
  _id: Types.ObjectId;
}): Promise<IVariant | null> => {
  return await Models.Variant.findByIdAndDelete({ _id });
};

/* specific resoruce publishedUnpublish */
const publishedUnpublished = async ({
  _id,
  is_published,
}: {
  _id: Types.ObjectId;
  is_published: boolean;
}): Promise<IVariant | null> => {
  return await Models.Variant.findByIdAndUpdate(_id, {
    $set: { is_published: !is_published },
  });
};

export const variantService = {
  findAll,
  findOneById,
  findOneByKey,
  storeDocument,
  findOneByIdAndDelete,
  findOneByIdAndUpdate,
  publishedUnpublished,
};
