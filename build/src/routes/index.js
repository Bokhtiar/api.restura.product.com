"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const category_route_1 = require("./admin/category.route");
const product_route_1 = require("./admin/product.route");
exports.router = (0, express_1.Router)();
exports.router.use("/category", category_route_1.CategoryRouotes);
exports.router.use("/product", product_route_1.productRouter);
