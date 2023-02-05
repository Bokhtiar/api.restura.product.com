import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import { userCategoryService } from "../../services/user/category.services";

export const index = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const resutls = await userCategoryService.findAll();
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
    const result = await userCategoryService.findOneById({
      _id: new Types.ObjectId(id),
    });
    res.status(200).json({
      status: true,
      data: result,
    });
  } catch (error: any) {
    console.log(error);
    next(error);
  }
};
