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
const User_service_1 = __importDefault(require("../Services/User.service"));
const userService = new User_service_1.default();
class UserController {
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const Users = yield userService.getAllUsers({
                relations: {
                    rol: true
                }
            });
            return res.json(Users);
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.body;
            const user = yield userService.getById(parseInt(id));
            return res.json(user);
        });
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            const user = yield userService.createUser(body);
            return res.json(user);
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.body;
            const { name, last_name, password, email } = req.body;
            const updatedUser = yield userService.updateUser(parseInt(id), { name, last_name, password, email });
            return updatedUser;
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const deletedUser = yield userService.deleteUser(parseInt(id));
            return deletedUser;
        });
    }
}
exports.default = UserController;
//# sourceMappingURL=User.Controller.js.map