import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import { ingredientService } from "../../services/admin/ingredient.services";
import { userProductService } from "../../services/user/product.services";

export const index = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const resutls = await userProductService.findAll();
    res.status(200).json({
      status: true,
      data: resutls,
    });
  } catch (error: any) {
    console.log(error);
    next(error);
  }
};

export const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await userProductService.findOneById({
      _id: new Types.ObjectId(id),
    });

    const array: any = result?.ingredient;

    let ingredientItem = [];
    for (let index = 0; index < array.length; index++) {
      const element: any = array[index];
      const ingredient = await ingredientService.findOneByID({
        _id: new Types.ObjectId(element.value),
      });

      ingredientItem.push({
        _id: ingredient?._id,
        name: ingredient?.name,
        icon: ingredient?.icon,
      });
    }

    const items = [];
    items.push({
      _id: result?._id,
      name: result?.name,
      price: result?.price,
      ingredient: ingredientItem,
      category: result?.category,
      description: result?.description,
      image: result?.image,
      cooking_time: result?.cooking_time,
      is_published: result?.is_published,
    });

    res.status(200).json({
      status: true,
      data: items ,
    });
  } catch (error: any) {
    console.log(error);
    next(error);
  }
};
