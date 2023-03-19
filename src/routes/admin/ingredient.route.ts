import express from "express";
import * as IngredientController from "../../controllers/admin/ingredient.controller";
import { ingredientValidators } from "../../validators/ingredient.validators";

export const IngredientRoute = express.Router();

IngredientRoute.get("/", IngredientController.Index);
IngredientRoute.post(
  "/",
  ingredientValidators.createUpdate,
  IngredientController.Store
);

IngredientRoute.get("/:id", IngredientController.Show);
IngredientRoute.put("/:id", IngredientController.Update);
IngredientRoute.delete("/:id", IngredientController.Desotry);
