"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ingredient = void 0;
const mongoose_1 = require("mongoose");
const ingredientSchema = new mongoose_1.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    icon: {
        type: String,
        trim: true,
        required: true,
    },
});
exports.Ingredient = (0, mongoose_1.model)("Ingredient", ingredientSchema);
