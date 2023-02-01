import { Router } from "express";
import { CategoryRouotes } from "./admin/category.route";

export const router: Router = Router();

router.use("/category", CategoryRouotes);
  