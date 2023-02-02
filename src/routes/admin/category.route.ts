import express from "express"
import * as categoryController from '../../controllers/admin/category.controller'

export const categoryRouotes = express.Router()

categoryRouotes.get("/", categoryController.index)
categoryRouotes.post("/", categoryController.store)
categoryRouotes.get("/:id", categoryController.show)
categoryRouotes.put("/:id", categoryController.update)
categoryRouotes.delete("/:id", categoryController.destroy) 
categoryRouotes.put("/publishUnpublish/:id", categoryController.publishUnpublish) 