"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Variant = void 0;
const mongoose_1 = require("mongoose");
const variantSchema = new mongoose_1.Schema({
    product: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Product",
        trim: true,
        required: true,
    },
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
    image: {
        type: String,
        trim: true,
        required: true,
    },
    is_published: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});
exports.Variant = (0, mongoose_1.model)("Variant", variantSchema);
