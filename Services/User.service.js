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
const User_entity_1 = __importDefault(require("../Entity/User.entity"));
const database_1 = require("../config/database");
const Rol_Service_1 = __importDefault(require("./Rol.Service"));
const rolService = new Rol_Service_1.default();
class UserService {
    constructor() {
        this.userRepository = database_1.Database.getRepository(User_entity_1.default);
    }
    getAllUsers(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.userRepository.find(options);
            return users;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOneBy({ id: id });
            return user;
        });
    }
    getByProperty(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.find(options);
            return user;
        });
    }
    createUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdUser = this.userRepository.create(data);
            const userRoles = yield rolService.getByProperty({ where: { name: "user" } });
            const userRol = userRoles[0];
            createdUser.rol = userRol;
            const user = yield this.userRepository.save(createdUser);
            return user;
        });
    }
    updateUser(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userRepository.update(id, data);
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const userToDelete = yield this.userRepository.findOneBy({ id: id });
            if (!userToDelete) {
                return null;
            }
            yield this.userRepository.remove(userToDelete);
        });
    }
}
exports.default = UserService;
//# sourceMappingURL=User.service.js.map