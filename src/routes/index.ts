import { Router } from "express";
import { categoryRouotes } from "./admin/category.route";
import { productRouter } from "./admin/product.route";
import { variantRoutes } from "./admin/variant.route";
import {adminPermission} from '../middlewares/admin.permission.middleware'

export const router: Router = Router();

router.use("/category",adminPermission, categoryRouotes);
router.use("/product",adminPermission, productRouter)
router.use("/variant", adminPermission,variantRoutes)
      