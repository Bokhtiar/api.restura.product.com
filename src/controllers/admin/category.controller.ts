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
    const emailExist = await categoryService.findOneByKey({ name });
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
      is_published: true,
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

/* sepecific resource */
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

/* updated */
export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { name, icon, parent, ancestors } = req.body;

    const documents: ICategoryCreateUpdate = {
      name,
      icon,
      parent,
      ancestors,
      is_published: true,
    };
    /* check unique name */
    const existWithName = await categoryService.findOneByKey({ name });
    if (existWithName && existWithName._id.toString() !== id) {
      return res.status(409).json(
        await HttpErrorResponse({
          status: false,
          errors: [
            {
              field: "Name",
              message: "Category name already exists.",
            },
          ],
        })
      );
    }

    await categoryService.findOneByIDAndUpdate({
      _id: new Types.ObjectId(id),
      documents,
    });
    res.status(201).json({
      status: true,
      message: "Category udated.",
    });
  } catch (error: any) {
    console.log(error);
    next(error);
  }
};

/* destory */
export const destroy = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await categoryService.findOneByAndDelete({ _id: new Types.ObjectId(id) });
    res.status(200).json({
      status: true,
      message: "Category deleted.",
    });
  } catch (error: any) {
    console.log(error);
    next(error);
  }
};

/* specific reosurce publish status change */
export const publishUnpublish = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params

    /* check available category */
    const availableCategory = await categoryService.findOneByID({ _id: new Types.ObjectId(id) })
    if (!availableCategory) {
      return res.status(404).json(
        await HttpErrorResponse({
          status: false,
          errors: [
            {
              field: "Category",
              message: "Category not found.",
            },
          ],
        })
      );
    }

    await categoryService.findOneByIdAndUpdatePublishUnpublish(
      {
        _id: new Types.ObjectId(id),
        is_published: availableCategory.is_published,
      }
    )

    res.status(200).json({
      status: true,
      message: "Successfully category updated"
    })

  } catch (error: any) {
    console.log(error);
    next(error)
  }
}