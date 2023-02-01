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
exports.show = exports.store = exports.index = void 0;
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
        /* email exist */
        const emailExist = yield category_services_1.categoryService.findOneByKey({ name });
        if (emailExist) {
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
