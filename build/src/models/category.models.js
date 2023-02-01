"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const mongoose_1 = require("mongoose");
const categorySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    icon: {
        type: String,
        required: true,
        trim: true,
    },
    parent: {
        type: mongoose_1.Types.ObjectId,
        default: null,
        ref: "Category",
    },
    ancestors: [
        {
            _id: {
                type: mongoose_1.Types.ObjectId,
                ref: "Category",
            },
            name: String,
        },
    ],
    is_published: {
        type: Boolean,
        default: true,
    },
});
exports.Category = (0, mongoose_1.model)("Category", categorySchema);
