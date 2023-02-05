import express from "express"
import * as categoryController from '../../controllers/user/category.controller'

export const categoryUserRouotes = express.Router()

categoryUserRouotes.get("/", categoryController.index)
categoryUserRouotes.get("/:id", categoryController.show)
