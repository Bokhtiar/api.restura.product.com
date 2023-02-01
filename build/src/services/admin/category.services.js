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
exports.categoryService = void 0;
const models_1 = require("../../models");
/* list of resurce */
const findAll = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield models_1.Models.Category.find({ parent: null });
});
/* nested category insert */
const buildAncestors = (id, parent_id) => __awaiter(void 0, void 0, void 0, function* () {
    let ancest = [];
    try {
        let parent_category = yield models_1.Models.Category.findOne({ _id: parent_id }, { name: 1, ancestors: 1 }).exec();
        if (parent_category) {
            const { _id, name } = parent_category;
            const ancest = [...parent_category.ancestors];
            ancest.unshift({ _id, name });
            const category = yield models_1.Models.Category.findByIdAndUpdate(id, {
                $set: { ancestors: ancest },
            });
        }
    }
    catch (err) {
        console.log(err.message);
    }
});
/* store resurce */
const storeResource = ({ documents, }) => __awaiter(void 0, void 0, void 0, function* () {
    let parent = documents.parent ? documents.parent : null;
    const category = new models_1.Models.Category({
        name: documents.name,
        parent,
        icon: documents.icon,
    });
    let newCategory = yield category.save();
    buildAncestors(newCategory._id, parent);
    return newCategory;
});
/* specific resouce findOneByID */
const findOneByID = ({ _id }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield models_1.Models.Category.findById({ _id });
});
const findOneByKey = (params) => __awaiter(void 0, void 0, void 0, function* () {
    return yield models_1.Models.Category.findOne(Object.assign({}, params));
});
exports.categoryService = {
    findAll,
    findOneByID,
    storeResource,
    findOneByKey
};
