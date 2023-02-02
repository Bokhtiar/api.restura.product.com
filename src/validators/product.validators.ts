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
    price: {
      type: "string",
      required: true,
      message: "Price is required.",
    },
    components: {
      type: "string",
      required: true,
      message: "Components is required.",
    },
    image: {
        type: "link",
        required: true,
        message: "Image is required.",
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

export const productValidators = {
  createUpdate,
};
