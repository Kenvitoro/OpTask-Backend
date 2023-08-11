"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Task_Controller_1 = __importDefault(require("../Controllers/Task.Controller"));
const VerificationToken_1 = require("../middlewares/VerificationToken");
const TaskRouter = (0, express_1.Router)();
const taskController = new Task_Controller_1.default();
TaskRouter.get('/Task', [VerificationToken_1.VerifyToken], taskController.getAllTasks);
TaskRouter.get('/Task/:id', [VerificationToken_1.VerifyToken], taskController.getById);
TaskRouter.get('/Tasks/:id', [VerificationToken_1.VerifyToken], taskController.getByListId);
TaskRouter.post('/Task', [VerificationToken_1.VerifyToken], taskController.createTask);
TaskRouter.patch('/Task', [VerificationToken_1.VerifyToken], taskController.updateTask);
TaskRouter.delete('/Task/:id', [VerificationToken_1.VerifyToken], taskController.deleteTask);
exports.default = TaskRouter;
//# sourceMappingURL=Task.Routes.js.map