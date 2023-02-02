import express from 'express'
import { variantValidators } from '../../validators/variant.validators'
import * as variantController from '../../controllers/admin/variant.controller'

export const variantRoutes = express.Router()

variantRoutes.get("/", variantController.index)
variantRoutes.post("/", variantController.store)
variantRoutes.get("/:id", variantController.show) 
variantRoutes.put("/:id", variantController.update)
variantRoutes.delete("/:id", variantController.destroy)
variantRoutes.put("/publishedUnpublished/:id", variantController.publishedUnpublished)    

 