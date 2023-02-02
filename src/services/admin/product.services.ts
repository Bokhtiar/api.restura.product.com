import { IProduct, IProductCreateUpdate } from "../../types/product.types";
import { Models } from "../../models";

/* findAll resurce */
const findAll = async():Promise<IProduct[] | []> => {
    return await Models.Product.find()
}

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

export const productServices = {
    findAll,
    findOneByKey,
    storeDocuments,
}
