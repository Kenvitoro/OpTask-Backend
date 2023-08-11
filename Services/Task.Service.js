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
const Task_entity_1 = __importDefault(require("../Entity/Task.entity"));
const database_1 = require("../config/database");
class TaskService {
    constructor() {
        this.taskRepository = database_1.Database.getRepository(Task_entity_1.default);
    }
    getAllTasks() {
        return __awaiter(this, void 0, void 0, function* () {
            const tasks = yield this.taskRepository.find();
            return tasks;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = yield this.taskRepository.findOneBy({ id: id });
            return task;
        });
    }
    getByProperty(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = yield this.taskRepository.find(options);
            return task;
        });
    }
    createTask(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdTask = this.taskRepository.create(data);
            yield this.taskRepository.save(createdTask);
        });
    }
    updateTask(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.taskRepository.update(id, data);
        });
    }
    deleteTask(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const taskToDelete = yield this.taskRepository.findOneBy({ id: id });
            if (!taskToDelete) {
                return null;
            }
            yield this.taskRepository.remove(taskToDelete);
        });
    }
}
exports.default = TaskService;
//# sourceMappingURL=Task.Service.js.map