"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const List_Controller_1 = __importDefault(require("../Controllers/List.Controller"));
const VerificationToken_1 = require("../middlewares/VerificationToken");
const ListRouter = (0, express_1.Router)();
const listController = new List_Controller_1.default();
ListRouter.get('/Lists/:userId', [VerificationToken_1.VerifyToken], listController.getAllLists);
ListRouter.get('/List/:id', [VerificationToken_1.VerifyToken], listController.getById);
ListRouter.get('/Listsc/:categoryId', [VerificationToken_1.VerifyToken], listController.getByCategoryId);
ListRouter.post('/List', [VerificationToken_1.VerifyToken], listController.createList);
ListRouter.patch('/List/', [VerificationToken_1.VerifyToken], listController.updateList);
ListRouter.delete('/List/', [VerificationToken_1.VerifyToken], listController.deleteList);
exports.default = ListRouter;
//# sourceMappingURL=List.Routes.js.map