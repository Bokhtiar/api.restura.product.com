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
exports.productServices = void 0;
const models_1 = require("../../models");
/* findAll resurce */
const findAll = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield models_1.Models.Product.find();
});
/* specific resoruce findOneByKey */
const findOneByKey = (params) => __awaiter(void 0, void 0, void 0, function* () {
    return yield models_1.Models.Product.findOne(Object.assign({}, params));
});
/* store documents */
const storeDocuments = ({ documents, }) => __awaiter(void 0, void 0, void 0, function* () {
    const newProduct = new models_1.Models.Product(Object.assign({}, documents));
    return yield newProduct.save();
});
/* specific resource findOneByID */
const findOneByID = ({ _id }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield models_1.Models.Product.findById({ _id });
});
/* specific resoruce findOneByUPdate */
const findOneByIdAndUpdate = ({ _id, documents }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield models_1.Models.Product.findByIdAndUpdate(_id, {
        $set: Object.assign({}, documents)
    });
});
/* specific resrouce delete */
const findOneByIDdAndDelete = ({ _id }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield models_1.Models.Product.findByIdAndDelete({ _id });
});
/* specefic resoruce publishedUnpublished */
const publishedUnpublished = ({ _id, is_published }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield models_1.Models.Product.findByIdAndUpdate(_id, {
        $set: { is_published: !is_published }
    });
});
exports.productServices = {
    findAll,
    findOneByID,
    findOneByKey,
    storeDocuments,
    publishedUnpublished,
    findOneByIdAndUpdate,
    findOneByIDdAndDelete
};
