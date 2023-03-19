import { Request, Response, NextFunction } from "express";
import { IIngredientCreateUpdate } from "../../types/ingredient.types";
import { ingredientService } from "../../services/admin/ingredient.services";
import { HttpErrorResponse } from "../../helper";

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
    const availableName = await ingredientService.findOneByKey({name});

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
