"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Models = void 0;
const category_models_1 = require("./category.models");
const product_models_1 = require("./product.models");
const variant_models_1 = require("./variant.models");
const ingredient_models_1 = require("./ingredient.models");
exports.Models = {
    Category: category_models_1.Category,
    Product: product_models_1.Product,
    Variant: variant_models_1.Variant,
    Ingredient: ingredient_models_1.Ingredient,
};
