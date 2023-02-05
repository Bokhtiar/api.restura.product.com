import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
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

    const variant = await userProductService.productHasAssingVariant({
      _id: new Types.ObjectId(id),
    });

    res.status(200).json({
      status: true,
      data: { "product": result, "variant": variant },
    });
  } catch (error: any) {
    console.log(error);
    next(error);
  }
};
