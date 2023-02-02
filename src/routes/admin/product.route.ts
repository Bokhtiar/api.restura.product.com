import express from "express";
import { productValidators } from "../../validators/product.validators";
import * as productController from "../../controllers/admin/product.controller";

export const productRouter = express.Router();

productRouter.get("/", productController.index);
productRouter.post("/", productValidators.createUpdate, productController.store)
productRouter.get("/:id", productController.show)
productRouter.put("/:id", productController.update)
