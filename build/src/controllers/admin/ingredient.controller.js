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
exports.Desotry = exports.Update = exports.Show = exports.Store = exports.Index = void 0;
const ingredient_services_1 = require("../../services/admin/ingredient.services");
const helper_1 = require("../../helper");
const mongoose_1 = require("mongoose");
/* resource list */
const Index = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield ingredient_services_1.ingredientService.findAll();
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
exports.Index = Index;
/* resurce store */
const Store = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, icon } = req.body;
        const availableName = yield ingredient_services_1.ingredientService.findOneByKey({ name });
        /* check available name */
        if (availableName) {
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
        /* docuemnts */
        const documents = {
            name,
            icon,
        };
        yield ingredient_services_1.ingredientService.storeDocument({ documents });
        res.status(201).json({
            status: true,
            message: "Ingredient Created.",
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.Store = Store;
/* specific resource  */
const Show = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield ingredient_services_1.ingredientService.findOneByID({
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
exports.Show = Show;
/* specific resource updated */
const Update = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, icon } = req.body;
        /* check unique name */
        const existWithName = yield ingredient_services_1.ingredientService.findOneByKey({ name });
        if (existWithName && existWithName._id.toString() !== id) {
            return res.status(409).json(yield (0, helper_1.HttpErrorResponse)({
                status: false,
                errors: [
                    {
                        field: "Name",
                        message: "Ingredient name already exists.",
                    },
                ],
            }));
        }
        /* documents */
        const documents = {
            name,
            icon,
        };
        yield ingredient_services_1.ingredientService.findOneByAndUpdated({
            _id: new mongoose_1.Types.ObjectId(id),
            documents,
        });
        res.status(201).json({
            status: true,
            messsage: "Ingredient updated.",
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.Update = Update;
/* specific resoruce desotry */
const Desotry = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield ingredient_services_1.ingredientService.findOneByAndDelete({ _id: new mongoose_1.Types.ObjectId(id) });
        res.status(200).json({
            status: true,
            message: "Ingredient Deleted."
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.Desotry = Desotry;
