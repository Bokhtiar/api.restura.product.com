import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import { HttpErrorResponse } from "../../../src/helper";
import { categoryService } from "../../../src/services/admin/category.services";
import { ICategoryCreateUpdate } from "../../types/category.types";

export const index = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const results = await categoryService.findAll();

    res.status(200).json({
      status: true,
      data: results,
    });
  } catch (error: any) {
    console.log(error);
    next(error);
  }
};

export const store = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, icon, parent, ancestors } = req.body;

    /* email exist */
    const emailExist = await categoryService.findOneByKey({ name })
    if (emailExist) {
      return res.status(409).json(
        await HttpErrorResponse({
          status: false,
          errors: [
            {
              field: "name",
              message: "Name already exist.",
            },
          ],
        })
      );
    }

    const documents: ICategoryCreateUpdate = {
      name,
      icon,
      parent,
      ancestors,
    };

    await categoryService.storeResource({ documents });

    res.status(200).json({
      status: true,
      message: "category",
    });
  } catch (error: any) {
    console.log(error);
    next(error);
  }
};

export const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await categoryService.findOneByID({
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
