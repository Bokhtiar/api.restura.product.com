import { Router } from "express";
import { categoryRouotes } from "./admin/category.route";
import { productRouter } from "./admin/product.route";
import { variantRoutes } from "./admin/variant.route";

export const router: Router = Router();

router.use("/category", categoryRouotes);
router.use("/product", productRouter)
router.use("/variant", variantRoutes)
   