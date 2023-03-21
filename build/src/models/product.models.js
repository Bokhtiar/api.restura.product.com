"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    price: {
        type: String,
        trim: true,
        required: true,
    },
    category: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Category",
        trim: true,
        required: true,
    },
    ingredient: {
        type: [],
        ref: "Ingredient",
        trim: true,
        required: true,
    },
    description: {
        type: String,
        trim: true,
    },
    image: {
        type: String,
        trim: true,
        required: true,
    },
    cooking_time: {
        type: String,
        trim: true,
    },
    offer_start: {
        type: String,
        trim: true,
    },
    offer_end: {
        type: String,
        trim: true,
    },
    is_published: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});
exports.Product = (0, mongoose_1.model)("Product", productSchema);
