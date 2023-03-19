import Schema from "async-validator";
import { NextFunction, Request, Response } from "express";

/* Resource createUpdate validaor */
const createUpdate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const descriptor = <any>{
    name: {
      type: "string",
      required: true,
      message: "Name is required.",
    },
    icon: {
      type: "string",
      required: true,
      message: "Icon is required.",
    },
  };

  /* Execute the validator */
  const validator = new Schema(descriptor);

  validator.validate({ ...req.body }, (errors: any) => {
    if (errors) {
      return res.status(422).json({
        status: false,
        errors,
      });
    }
    next();
  });
};

export const ingredientValidators = {
  createUpdate,
};
