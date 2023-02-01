import { Types } from "mongoose";
import { Models } from "../../models";
import { ICategory, ICategoryCreateUpdate } from "../../types/category.types";

/* list of resurce */
const findAll = async (): Promise<ICategory[] | []> => {
  return await Models.Category.find({ parent: null });
};

/* nested category insert */
const buildAncestors = async (id: any, parent_id: any) => {
  let ancest = [];
  try {
    let parent_category = await Models.Category.findOne(
      { _id: parent_id },
      { name: 1, ancestors: 1 }
    ).exec();
    if (parent_category) {
      const { _id, name } = parent_category;
      const ancest = [...parent_category.ancestors];
      ancest.unshift({ _id, name });
      const category = await Models.Category.findByIdAndUpdate(id, {
        $set: { ancestors: ancest },
      });
    }
  } catch (err: any) {
    console.log(err.message);
  }
};

/* store resurce */
const storeResource = async ({
  documents,
}: {
  documents: ICategoryCreateUpdate;
}): Promise<ICategory | null> => {
  let parent = documents.parent ? documents.parent : null;
  const category = new Models.Category({
    name: documents.name,
    parent,
    icon: documents.icon,
  });

  let newCategory = await category.save();
  buildAncestors(newCategory._id, parent);
  return newCategory;
};

/* specific resouce findOneByID */
const findOneByID = async({_id}: {_id:Types.ObjectId}):Promise<ICategory | null> => {
  return await Models.Category.findById({_id})
}

const findOneByKey = async(params:any): Promise<ICategory | null> => {
  return await Models.Category.findOne({...params})
}

export const categoryService = {
  findAll,
  findOneByID,
  storeResource,
  findOneByKey
};
