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
exports.publishUnpublish = exports.destroy = exports.update = exports.show = exports.store = exports.index = void 0;
const mongoose_1 = require("mongoose");
const helper_1 = require("../../../src/helper");
const category_services_1 = require("../../../src/services/admin/category.services");
const index = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield category_services_1.categoryService.findAll();
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
const store = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, icon, parent, ancestors } = req.body;
        /* name exist */
        const nameExist = yield category_services_1.categoryService.findOneByKey({ name });
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
            icon,
            parent,
            ancestors,
            is_published: true,
        };
        yield category_services_1.categoryService.storeResource({ documents });
        res.status(200).json({
            status: true,
            message: "category",
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.store = store;
/* sepecific resource */
const show = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield category_services_1.categoryService.findOneByID({
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
/* updated */
const update = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, icon, parent, ancestors } = req.body;
        const documents = {
            name,
            icon,
            parent,
            ancestors,
            is_published: true,
        };
        /* check unique name */
        const existWithName = yield category_services_1.categoryService.findOneByKey({ name });
        if (existWithName && existWithName._id.toString() !== id) {
            return res.status(409).json(yield (0, helper_1.HttpErrorResponse)({
                status: false,
                errors: [
                    {
                        field: "Name",
                        message: "Category name already exists.",
                    },
                ],
            }));
        }
        yield category_services_1.categoryService.findOneByIDAndUpdate({
            _id: new mongoose_1.Types.ObjectId(id),
            documents,
        });
        res.status(201).json({
            status: true,
            message: "Category udated.",
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.update = update;
/* destory */
const destroy = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield category_services_1.categoryService.findOneByAndDelete({ _id: new mongoose_1.Types.ObjectId(id) });
        res.status(200).json({
            status: true,
            message: "Category deleted.",
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.destroy = destroy;
/* specific reosurce publish status change */
const publishUnpublish = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        /* check available category */
        const availableCategory = yield category_services_1.categoryService.findOneByID({ _id: new mongoose_1.Types.ObjectId(id) });
        if (!availableCategory) {
            return res.status(404).json(yield (0, helper_1.HttpErrorResponse)({
                status: false,
                errors: [
                    {
                        field: "Category",
                        message: "Category not found.",
                    },
                ],
            }));
        }
        yield category_services_1.categoryService.findOneByIdAndUpdatePublishUnpublish({
            _id: new mongoose_1.Types.ObjectId(id),
            is_published: availableCategory.is_published,
        });
        res.status(200).json({
            status: true,
            message: "Successfully category updated"
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.publishUnpublish = publishUnpublish;
