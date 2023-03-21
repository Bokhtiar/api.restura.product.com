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
exports.publishedUnpublished = exports.destroy = exports.update = exports.show = exports.store = exports.index = void 0;
const helper_1 = require("../../helper");
const product_services_1 = require("../../services/admin/product.services");
const mongoose_1 = require("mongoose");
const ingredient_services_1 = require("../../services/admin/ingredient.services");
/* list of resoruce */
const index = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield product_services_1.productServices.findAll();
        res.status(200).json({
            status: true,
            data: results,
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.index = index;
/* store documents */
const store = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, price, category, ingredient, description, image, cooking_time, offer_start, offer_end, is_published, } = req.body;
        console.log("test", req.body);
        /* name exists */
        const nameExist = yield product_services_1.productServices.findOneByKey({ name });
        if (nameExist) {
            return res.status(409).json(yield (0, helper_1.HttpErrorResponse)({
                status: false,
                errors: [
                    {
                        field: "name",
                        message: "Name already exist.",
                    },
                ],
            }));
        }
        const documents = {
            name,
            price,
            category: new mongoose_1.Types.ObjectId(category.value),
            ingredient,
            description,
            image,
            cooking_time,
            offer_start,
            offer_end,
            is_published,
        };
        console.log(documents);
        yield product_services_1.productServices.storeDocuments({ documents });
        res.status(201).json({
            status: true,
            message: "Product created.",
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.store = store;
/* specific resoruce show */
const show = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield product_services_1.productServices.findOneByID({
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
            ingredient: ingredientItem,
            price: result === null || result === void 0 ? void 0 : result.price,
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
/* specific resrouce update */
const update = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, price, category, ingredient, description, image, cooking_time, offer_start, offer_end, is_published, } = req.body;
        /* check unique name */
        const existWithName = yield product_services_1.productServices.findOneByKey({ name });
        if (existWithName && existWithName._id.toString() !== id) {
            return res.status(409).json(yield (0, helper_1.HttpErrorResponse)({
                status: false,
                errors: [
                    {
                        field: "Name",
                        message: "Product name already exists.",
                    },
                ],
            }));
        }
        const documents = {
            name,
            price,
            category,
            ingredient,
            description,
            image,
            cooking_time,
            offer_start,
            offer_end,
            is_published,
        };
        yield product_services_1.productServices.findOneByIdAndUpdate({
            _id: new mongoose_1.Types.ObjectId(id),
            documents,
        });
        res.status(201).json({
            status: true,
            message: "Product Updated.",
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.update = update;
/* specific resoruce delete */
const destroy = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield product_services_1.productServices.findOneByIDdAndDelete({
            _id: new mongoose_1.Types.ObjectId(id),
        });
        res.status(200).json({
            status: true,
            message: "Product Deleted.",
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.destroy = destroy;
/* specific resoruce published Unpublished */
const publishedUnpublished = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        /* availabe product */
        const availabeProduct = yield product_services_1.productServices.findOneByID({
            _id: new mongoose_1.Types.ObjectId(id),
        });
        if (!availabeProduct) {
            return res.status(409).json(yield (0, helper_1.HttpErrorResponse)({
                status: false,
                errors: [
                    {
                        field: "Product",
                        message: "Product not avaialable.",
                    },
                ],
            }));
        }
        yield product_services_1.productServices.publishedUnpublished({
            _id: new mongoose_1.Types.ObjectId(id),
            is_published: availabeProduct.is_published,
        });
        res.status(201).json({
            status: true,
            message: "Product updated",
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.publishedUnpublished = publishedUnpublished;
