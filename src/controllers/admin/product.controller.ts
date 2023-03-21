import { Request, Response, NextFunction } from "express";
import { IProductCreateUpdate } from "../../types/product.types";
import { HttpErrorResponse } from "../../helper";
import { productServices } from "../../services/admin/product.services";
import { Types } from "mongoose";
import { ingredientService } from "../../services/admin/ingredient.services";

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
      category,
      ingredient,
      description,
      image,
      cooking_time,
      offer_start,
      offer_end, 
      is_published,
    } = req.body;
    console.log("test", req.body);

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
      category: new Types.ObjectId(category.value),
      ingredient,
      description,
      image,
      cooking_time,
      offer_start,
      offer_end,
      is_published,
    };
    console.log(documents);

    await productServices.storeDocuments({ documents });

    res.status(201).json({
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
      ingredient: ingredientItem,
      price: result?.price,
      image: result?.image,
      cooking_time: result?.cooking_time,
      is_published: result?.is_published,
    });

    res.status(200).json({
      status: true,
      data: items,
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
    const { id } = req.params;
    const {
      name,
      price,
      category,
      ingredient,
      description,
      image,
      cooking_time,
      offer_start,
      offer_end,
      is_published,
    } = req.body;

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

    const documents: IProductCreateUpdate = {
      name,
      price,
      category,
      ingredient,
      description,
      image,
      cooking_time,
      offer_start,
      offer_end,
      is_published,
    };

    await productServices.findOneByIdAndUpdate({
      _id: new Types.ObjectId(id),
      documents,
    });

    res.status(201).json({
      status: true,
      message: "Product Updated.",
    });
  } catch (error: any) {
    console.log(error);
    next(error);
  }
};

/* specific resoruce delete */
export const destroy = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await productServices.findOneByIDdAndDelete({
      _id: new Types.ObjectId(id),
    });
    res.status(200).json({
      status: true,
      message: "Product Deleted.",
    });
  } catch (error: any) {
    console.log(error);
    next(error);
  }
};

/* specific resoruce published Unpublished */
export const publishedUnpublished = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    /* availabe product */
    const availabeProduct = await productServices.findOneByID({
      _id: new Types.ObjectId(id),
    });
    if (!availabeProduct) {
      return res.status(409).json(
        await HttpErrorResponse({
          status: false,
          errors: [
            {
              field: "Product",
              message: "Product not avaialable.",
            },
          ],
        })
      );
    }

    await productServices.publishedUnpublished({
      _id: new Types.ObjectId(id),
      is_published: availabeProduct.is_published,
    });

    res.status(201).json({
      status: true,
      message: "Product updated",
    });
  } catch (error: any) {
    console.log(error);
    next(error);
  }
};
