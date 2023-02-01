import express from "express"
import * as categoryController from '../../controllers/admin/category.controller'

export const CategoryRouotes = express.Router()

CategoryRouotes.get("/", categoryController.index)
CategoryRouotes.post("/", categoryController.store)
CategoryRouotes.get("/:id", categoryController.show)
CategoryRouotes.put("/:id", categoryController.update)
CategoryRouotes.delete("/:id", categoryController.destroy) 
CategoryRouotes.put("/publishUnpublish/:id", categoryController.publishUnpublish) 