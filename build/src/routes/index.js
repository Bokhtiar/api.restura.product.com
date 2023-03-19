"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const category_route_1 = require("./admin/category.route");
const product_route_1 = require("./admin/product.route");
const variant_route_1 = require("./admin/variant.route");
const admin_permission_middleware_1 = require("../middlewares/admin.permission.middleware");
const category_route_2 = require("./user/category.route");
const product_route_2 = require("./user/product.route");
const ingredient_route_1 = require("./admin/ingredient.route");
exports.router = (0, express_1.Router)();
exports.router.use("/category", admin_permission_middleware_1.adminPermission, category_route_1.categoryRouotes);
exports.router.use("/product", admin_permission_middleware_1.adminPermission, product_route_1.productRouter);
exports.router.use("/variant", admin_permission_middleware_1.adminPermission, variant_route_1.variantRoutes);
exports.router.use("/ingredient", admin_permission_middleware_1.adminPermission, ingredient_route_1.IngredientRoute);
/* user route */
exports.router.use("/user/category", category_route_2.categoryUserRouotes);
exports.router.use("/user/product", product_route_2.productUserRouotes);
