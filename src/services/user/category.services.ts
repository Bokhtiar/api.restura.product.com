import { ICategory } from "../../types/category.types";
import { Models } from "../../models";
import { Types } from "mongoose";

/* findAll  */
const findAll = async (): Promise<ICategory[] | []> => {
  return await Models.Category.find({is_published: true}, { name: 1, icon: 1 });
};

/* findOneById */
const findOneById = async ({
  _id,
}: {
  _id: Types.ObjectId;
}): Promise<ICategory | null> => {
  return await Models.Category.findById({ _id }, {name: 1, icon: 1});
};

export const userCategoryService = {
  findAll,
  findOneById,
};
