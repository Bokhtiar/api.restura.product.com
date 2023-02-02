import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import { IVariantCreateUpdate } from "../../types/variant.type";
import { HttpErrorResponse } from "../../config/helper";
import { variantService } from "../../services/admin/variant.services";

/* list of resoruce */
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

/* specific resource show */
export const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await variantService.findOneById({
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

/* specific resoruce update */
export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { name, product, image, price } = req.body;

    /* exist variant */
    const vaiantExist = await variantService.findOneByKey({
      product: new Types.ObjectId(product),
      name: name,
    });
    if (vaiantExist && vaiantExist._id.toString() !== id) {
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

    await variantService.findOneByIdAndUpdate({
      _id: new Types.ObjectId(id),
      documents: documents,
    });

    res.status(200).json({
      status: true,
      message: "Variant Updated.",
    });
    
  } catch (error: any) {
    console.log(error);
    next(error);
  }
};
