import { Request, Response, NextFunction } from "express";

/* list of resoruce */
export const index = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(200).json({
      status: true,
      message: "Product list",
    });
  } catch (error: any) {
    console.log(error);
    next(error);
  }
};
