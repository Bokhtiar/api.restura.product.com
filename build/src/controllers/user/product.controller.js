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
exports.show = exports.index = void 0;
const mongoose_1 = require("mongoose");
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
        const variant = yield product_services_1.userProductService.productHasAssingVariant({
            _id: new mongoose_1.Types.ObjectId(id),
        });
        res.status(200).json({
            status: true,
            data: { "product": result, "variant": variant },
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.show = show;
