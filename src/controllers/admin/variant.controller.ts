import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import { IVariantCreateUpdate } from "../../types/variant.type";
import { HttpErrorResponse } from "../../config/helper";
import { variantService } from "../../services/admin/variant.services";

export const index = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const resutls = await variantService.findAll();
    res.status(200).json({
      status: true,
      data: resutls,
    });
  } catch (error: any) {
    console.log(error);
    next(error);
  }
};

/* store resource  */
export const store = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, product, image, price } = req.body;

    /* exist variant */
    const vaiantExist = await variantService.findOneByKey({
      product: new Types.ObjectId(product),
      name: name,
    });
    if (vaiantExist) {
      return res.status(409).json(
        await HttpErrorResponse({
          status: false,
          errors: [
            {
              field: "Variant",
              message: "Variant name already exists.",
            },
          ],
        })
      );
    }

    const documents: IVariantCreateUpdate = {
      name,
      product,
      image,
      price,
      is_published: true,
    };

    await variantService.storeDocument({ documents });

    res.status(201).json({
      status: true,
      message: "Product variant created.",
    });
  } catch (error: any) {
    console.log(error);
    next(error);
  }
};
