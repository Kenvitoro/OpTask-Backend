"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Category_Controller_1 = __importDefault(require("../Controllers/Category.Controller"));
const VerificationToken_1 = require("../middlewares/VerificationToken");
const CategoryRouter = (0, express_1.Router)();
const categoryController = new Category_Controller_1.default();
CategoryRouter.get('/Category/:userId', [VerificationToken_1.VerifyToken], categoryController.getAllCategories);
CategoryRouter.get('/Category/:id', [VerificationToken_1.VerifyToken], categoryController.getById);
CategoryRouter.post('/Category', [VerificationToken_1.VerifyToken], categoryController.createCategory);
CategoryRouter.patch('/Category', [VerificationToken_1.VerifyToken], categoryController.updateCategory);
CategoryRouter.delete('/Category/:id', [VerificationToken_1.VerifyToken], categoryController.deleteCategory);
exports.default = CategoryRouter;
//# sourceMappingURL=Category.Routes.js.map