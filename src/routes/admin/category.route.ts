import express from "express"
import * as categoryController from '../../controllers/admin/category.controller'

export const CategoryRouotes = express.Router()

CategoryRouotes.get("/", categoryController.index)
CategoryRouotes.post("/", categoryController.store)