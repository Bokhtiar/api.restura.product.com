import { Models } from "../../models";
import {
  IIngredient,
  IIngredientCreateUpdate,
} from "../../types/ingredient.types";

/* resoruce list */
const findAll = async (): Promise<IIngredient[] | []> => {
  return await Models.Ingredient.find();
};

/* specific resource */
const findOneByKey = async (params: any): Promise<IIngredient | null> => {
  return await Models.Ingredient.findOne({ ...params });
};

/* store document */
const storeDocument = async ({
  documents,
}: {
  documents: IIngredientCreateUpdate;
}): Promise<IIngredient | null> => {
  const storeDocument = new Models.Ingredient({
    ...documents,
  });

  return await storeDocument.save();
};

export const ingredientService = {
  findAll,
  findOneByKey,
  storeDocument,
};
