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
exports.store = exports.index = void 0;
const helper_1 = require("../../helper");
const product_services_1 = require("../../services/admin/product.services");
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
        const { name, price, components, description, image, cooking_time, offer_start, offer_end, is_published, } = req.body;
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
            components,
            description,
            image,
            cooking_time,
            offer_start,
            offer_end,
            is_published,
        };
        yield product_services_1.productServices.storeDocuments({ documents });
        res.status(200).json({
            status: true,
            message: "Product created."
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.store = store;
