"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryHasAssingProduct = exports.show = exports.index = void 0;
const mongoose_1 = require("mongoose");
const ingredient_services_1 = require("../../services/admin/ingredient.services");
const product_services_1 = require("../../services/user/product.services");
const index = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resutls = yield product_services_1.userProductService.findAll();
        res.status(200).json({
            status: true,
            data: resutls,
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.index = index;
const show = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield product_services_1.userProductService.findOneById({
            _id: new mongoose_1.Types.ObjectId(id),
        });
        const array = result === null || result === void 0 ? void 0 : result.ingredient;
        let ingredientItem = [];
        for (let index = 0; index < array.length; index++) {
            const element = array[index];
            const ingredient = yield ingredient_services_1.ingredientService.findOneByID({
                _id: new mongoose_1.Types.ObjectId(element.value),
            });
            ingredientItem.push({
                _id: ingredient === null || ingredient === void 0 ? void 0 : ingredient._id,
                name: ingredient === null || ingredient === void 0 ? void 0 : ingredient.name,
                icon: ingredient === null || ingredient === void 0 ? void 0 : ingredient.icon,
            });
        }
        const items = [];
        items.push({
            _id: result === null || result === void 0 ? void 0 : result._id,
            name: result === null || result === void 0 ? void 0 : result.name,
            price: result === null || result === void 0 ? void 0 : result.price,
            ingredient: ingredientItem,
            category: result === null || result === void 0 ? void 0 : result.category,
            description: result === null || result === void 0 ? void 0 : result.description,
            image: result === null || result === void 0 ? void 0 : result.image,
            cooking_time: result === null || result === void 0 ? void 0 : result.cooking_time,
            is_published: result === null || result === void 0 ? void 0 : result.is_published,
        });
        res.status(200).json({
            status: true,
            data: items,
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.show = show;
/* category has assing product */
const categoryHasAssingProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        console.log(id);
        const resutls = product_services_1.userProductService.productHasAssingCategory({
            _id: new mongoose_1.Types.ObjectId(id),
        });
        res.status(200).json({
            status: true,
            data: resutls,
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.categoryHasAssingProduct = categoryHasAssingProduct;
