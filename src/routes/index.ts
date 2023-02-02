import { Router } from "express";
import { CategoryRouotes } from "./admin/category.route";
import { productRouter } from "./admin/product.route";

export const router: Router = Router();

router.use("/category", CategoryRouotes);
router.use("/product", productRouter)
   