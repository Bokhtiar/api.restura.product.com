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
const mongoose_1 = require("mongoose");
const helper_1 = require("../../config/helper");
const variant_services_1 = require("../../services/admin/variant.services");
/* list of resoruce */
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
/* specific resource show */
const show = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield variant_services_1.variantService.findOneById({
            _id: new mongoose_1.Types.ObjectId(id),
        });
        res.status(200).json({
            status: true,
            data: result,
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.show = show;
/* specific resoruce update */
const update = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, product, image, price } = req.body;
        /* exist variant */
        const vaiantExist = yield variant_services_1.variantService.findOneByKey({
            product: new mongoose_1.Types.ObjectId(product),
            name: name,
        });
        if (vaiantExist && vaiantExist._id.toString() !== id) {
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
        yield variant_services_1.variantService.findOneByIdAndUpdate({
            _id: new mongoose_1.Types.ObjectId(id),
            documents: documents,
        });
        res.status(201).json({
            status: true,
            message: "Variant Updated.",
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.update = update;
/* specific resource by delete */
const destroy = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield variant_services_1.variantService.findOneByIdAndDelete({ _id: new mongoose_1.Types.ObjectId(id) });
        res.status(200).json({
            status: true,
            message: "Product variant deleted",
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.destroy = destroy;
/* specific resource publishedUnpublished */
const publishedUnpublished = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        /* available variant */
        const availableVariant = yield variant_services_1.variantService.findOneById({
            _id: new mongoose_1.Types.ObjectId(id),
        });
        if (!availableVariant) {
            return res.status(409).json(yield (0, helper_1.HttpErrorResponse)({
                status: false,
                errors: [
                    {
                        field: "Variant",
                        message: "Variant  already exists.",
                    },
                ],
            }));
        }
        yield variant_services_1.variantService.publishedUnpublished({
            _id: new mongoose_1.Types.ObjectId(id),
            is_published: availableVariant.is_published,
        });
        res.status(201).json({
            status: true,
            message: "Product variant updated.",
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.publishedUnpublished = publishedUnpublished;
