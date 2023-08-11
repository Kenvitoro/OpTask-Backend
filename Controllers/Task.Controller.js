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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Task_Service_1 = __importDefault(require("../Services/Task.Service"));
const taskService = new Task_Service_1.default();
class TaskController {
    getAllTasks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const tasks = yield taskService.getAllTasks();
            return res.json(tasks);
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.body;
            const task = yield taskService.getById(parseInt(id));
            return res.json(task);
        });
    }
    getByListId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const tasks = yield taskService.getByProperty({
                relations: {
                    list: true,
                },
                where: {
                    list: { id: id },
                }
            });
            return res.json(tasks);
        });
    }
    createTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            const task = yield taskService.createTask(body);
            return res.json(task);
        });
    }
    updateTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.body;
            const { tittle, status } = req.body;
            const updatedTask = yield taskService.updateTask(parseInt(id), { tittle, status });
            return res.json(updatedTask);
        });
    }
    deleteTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.body;
            const deletedTask = yield taskService.deleteTask(parseInt(id));
            return deletedTask;
        });
    }
}
exports.default = TaskController;
//# sourceMappingURL=Task.Controller.js.map