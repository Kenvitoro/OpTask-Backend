"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("../Controllers/auth.controller"));
const AuthRouter = (0, express_1.Router)();
const authController = new auth_controller_1.default();
AuthRouter.post('/signup', authController.signUp);
AuthRouter.post('/signin', authController.signIn);
exports.default = AuthRouter;
//# sourceMappingURL=auth.Routes.js.map