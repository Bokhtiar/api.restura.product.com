import { Router } from "express";
import { categoryRouotes } from "./admin/category.route";
import { productRouter } from "./admin/product.route";
import { variantRoutes } from "./admin/variant.route";
import { adminPermission } from "../middlewares/admin.permission.middleware";
import { categoryUserRouotes } from "./user/category.route";
import { productUserRouotes } from "./user/product.route";
import { IngredientRoute } from "./admin/ingredient.route";

export const router: Router = Router();

router.use("/category", adminPermission, categoryRouotes);
router.use("/product", adminPermission, productRouter);
router.use("/variant", adminPermission, variantRoutes);
router.use("/ingredient", adminPermission, IngredientRoute);

/* user route */
router.use("/user/category", categoryUserRouotes);
router.use("/user/product", productUserRouotes);
