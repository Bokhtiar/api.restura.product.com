"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IngredientRoute = void 0;
const express_1 = __importDefault(require("express"));
const IngredientController = __importStar(require("../../controllers/admin/ingredient.controller"));
const ingredient_validators_1 = require("../../validators/ingredient.validators");
exports.IngredientRoute = express_1.default.Router();
exports.IngredientRoute.get("/", IngredientController.Index);
exports.IngredientRoute.post("/", ingredient_validators_1.ingredientValidators.createUpdate, IngredientController.Store);
exports.IngredientRoute.get("/:id", IngredientController.Show);
exports.IngredientRoute.put("/:id", IngredientController.Update);
exports.IngredientRoute.delete("/:id", IngredientController.Desotry);
