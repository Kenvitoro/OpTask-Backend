"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_Controller_1 = __importDefault(require("../Controllers/User.Controller"));
const VerificationToken_1 = require("../middlewares/VerificationToken");
const VerificationRol_1 = require("../middlewares/VerificationRol");
const UserRouter = (0, express_1.Router)();
const userController = new User_Controller_1.default();
UserRouter.get('/user', [VerificationToken_1.VerifyToken, VerificationRol_1.isAdmin], userController.getAllUsers);
UserRouter.get('/user/:id', [VerificationToken_1.VerifyToken, VerificationRol_1.isUser], userController.getById);
UserRouter.post('/user', userController.createUser);
UserRouter.patch('/user/:id', userController.updateUser);
UserRouter.delete('/user/:id', [VerificationToken_1.VerifyToken, VerificationRol_1.isAdmin], userController.deleteUser);
exports.default = UserRouter;
//# sourceMappingURL=User.Routes.js.map