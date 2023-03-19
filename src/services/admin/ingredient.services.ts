import { Types } from "mongoose";
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

/* specific resource by id */
const findOneByID = async ({
  _id,
}: {
  _id: Types.ObjectId;
}): Promise<IIngredient | null> => {
  return await Models.Ingredient.findById({ _id });
};

/* specific resource update */
const findOneByAndUpdated = async ({
  _id,
  documents,
}: {
  _id: Types.ObjectId;
  documents: IIngredientCreateUpdate;
}): Promise<IIngredient | null> => {
  return await Models.Ingredient.findByIdAndUpdate(_id, {
    $set: { ...documents },
  });
};

/* specific resource destory */
const findOneByAndDelete = async ({
  _id,
}: {
  _id: Types.ObjectId;
}): Promise<IIngredient | null> => {
  return Models.Ingredient.findByIdAndDelete({ _id });
};

export const ingredientService = {
  findAll,
  findOneByID,
  findOneByKey,
  storeDocument,
  findOneByAndDelete,
  findOneByAndUpdated,
};
