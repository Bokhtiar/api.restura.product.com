import express from "express"
import * as productController from '../../controllers/user/product.controller'

export const productUserRouotes = express.Router()

productUserRouotes.get("/", productController.index)
productUserRouotes.get("/:id", productController.show)
productUserRouotes.get("/category/:id", productController.categoryHasAssingProduct)
