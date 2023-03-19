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
exports.Store = exports.Index = void 0;
const ingredient_services_1 = require("../../services/admin/ingredient.services");
const helper_1 = require("../../helper");
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
