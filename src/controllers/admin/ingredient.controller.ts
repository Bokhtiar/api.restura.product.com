import { Request, Response, NextFunction } from "express";
import { IIngredientCreateUpdate } from "../../types/ingredient.types";
import { ingredientService } from "../../services/admin/ingredient.services";
import { HttpErrorResponse } from "../../helper";
import { Types } from "mongoose";

/* resource list */
export const Index = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const results = await ingredientService.findAll();
    res.status(200).json({
      status: true,
      data: results,
    });
  } catch (error: any) {
    console.log(error);
    next(error);
  }
};

/* resurce store */
export const Store = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, icon } = req.body;
    const availableName = await ingredientService.findOneByKey({ name });

    /* check available name */
    if (availableName) {
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

    /* docuemnts */
    const documents: IIngredientCreateUpdate = {
      name,
      icon,
    };

    await ingredientService.storeDocument({ documents });

    res.status(201).json({
      status: true,
      message: "Ingredient Created.",
    });
  } catch (error: any) {
    console.log(error);
    next(error);
  }
};

/* specific resource  */
export const Show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await ingredientService.findOneByID({
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

/* specific resource updated */
export const Update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { name, icon } = req.body;

    /* check unique name */
    const existWithName = await ingredientService.findOneByKey({ name });
    if (existWithName && existWithName._id.toString() !== id) {
      return res.status(409).json(
        await HttpErrorResponse({
          status: false,
          errors: [
            {
              field: "Name",
              message: "Ingredient name already exists.",
            },
          ],
        })
      );
    }

    /* documents */
    const documents: IIngredientCreateUpdate = {
      name,
      icon,
    };

    await ingredientService.findOneByAndUpdated({
      _id: new Types.ObjectId(id),
      documents,
    });
    res.status(201).json({
      status: true,
      messsage: "Ingredient updated.",
    });
  } catch (error: any) {
    console.log(error);
    next(error);
  }
};

/* specific resoruce desotry */
export const Desotry = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await ingredientService.findOneByAndDelete({ _id: new Types.ObjectId(id) });
     res.status(200).json({
        status: true,
        message: "Ingredient Deleted."
     })
  } catch (error: any) {
    console.log(error);
    next(error);
  }
};
