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
const mongoose_1 = require("mongoose");
const helper_1 = require("../../config/helper");
const variant_services_1 = require("../../services/admin/variant.services");
const index = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resutls = yield variant_services_1.variantService.findAll();
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
/* store resource  */
const store = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, product, image, price } = req.body;
        /* exist variant */
        const vaiantExist = yield variant_services_1.variantService.findOneByKey({
            product: new mongoose_1.Types.ObjectId(product),
            name: name,
        });
        if (vaiantExist) {
            return res.status(409).json(yield (0, helper_1.HttpErrorResponse)({
                status: false,
                errors: [
                    {
                        field: "Variant",
                        message: "Variant name already exists.",
                    },
                ],
            }));
        }
        const documents = {
            name,
            product,
            image,
            price,
            is_published: true,
        };
        yield variant_services_1.variantService.storeDocument({ documents });
        res.status(201).json({
            status: true,
            message: "Product variant created.",
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.store = store;
