import { Request, Response, NextFunction } from "express";
import { IProductCreateUpdate } from "../../types/product.types";
import { HttpErrorResponse } from "../../helper";
import { productServices } from "../../services/admin/product.services";
import { Types } from "mongoose";

/* list of resoruce */
export const index = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const results = await productServices.findAll();

    res.status(200).json({
      status: true,
      data: results,
    });
  } catch (error: any) {
    console.log(error);
    next(error);
  }
};

/* store documents */
export const store = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      name,
      price,
      components,
      description,
      image,
      cooking_time,
      offer_start,
      offer_end,
      is_published,
    }= req.body;

    /* name exists */
    const nameExist = await productServices.findOneByKey({ name });
    if (nameExist) {
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

    const documents: IProductCreateUpdate = {
      name,
      price,
      components,
      description,
      image,
      cooking_time,
      offer_start,
      offer_end,
      is_published,
    };

    await productServices.storeDocuments({ documents });

    res.status(200).json({
      status: true,
      message: "Product created.",
    });
  } catch (error: any) {
    console.log(error);
    next(error);
  }
};

/* specific resoruce show */
export const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const result = await productServices.findOneByID({
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

/* specific resrouce update */
export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {id} = req.params
    const {
      name,
      price,
      components,
      description,
      image,
      cooking_time,
      offer_start,
      offer_end,
      is_published,
    }= req.body;

    /* check unique name */
    const existWithName = await productServices.findOneByKey({ name });
    if (existWithName && existWithName._id.toString() !== id) {
      return res.status(409).json(
        await HttpErrorResponse({
          status: false,
          errors: [
            {
              field: "Name",
              message: "Product name already exists.",
            },
          ],
        })
      );
    }

    const documents:IProductCreateUpdate = {
      name,
      price,
      components,
      description,
      image,
      cooking_time,
      offer_start,
      offer_end,
      is_published,
    }

    await productServices.findOneByIdAndUpdate({_id: new Types.ObjectId(id), documents})

    res.status(201).json({
      status: true,
      message: "Product Updated."
    })
    
  } catch (error: any) {
    console.log(error);
    next(error);
  }
};
