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
exports.variantService = void 0;
const models_1 = require("../../models");
/* list of resource */
const findAll = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield models_1.Models.Variant.find();
});
/* store docuement */
const storeDocument = ({ documents, }) => __awaiter(void 0, void 0, void 0, function* () {
    const newVariant = new models_1.Models.Variant(Object.assign({}, documents));
    return yield newVariant.save();
});
/* specific resrouce findOneByKey */
const findOneByKey = ({ product, name, }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield models_1.Models.Variant.findOne({ product: product, name: name });
});
/* specific resoruce findOneById */
const findOneById = ({ _id, }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield models_1.Models.Variant.findById({ _id });
});
/*specific resoruce findOneByIdAndUpdate */
const findOneByIdAndUpdate = ({ _id, documents, }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield models_1.Models.Variant.findByIdAndUpdate(_id, {
        $set: Object.assign({}, documents),
    });
});
exports.variantService = {
    findAll,
    findOneById,
    findOneByKey,
    storeDocument,
    findOneByIdAndUpdate
};
