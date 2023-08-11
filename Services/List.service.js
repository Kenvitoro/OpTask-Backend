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
const List_entity_1 = __importDefault(require("../Entity/List.entity"));
const database_1 = require("../config/database");
class ListService {
    constructor() {
        this.listRepository = database_1.Database.getRepository(List_entity_1.default);
    }
    getAllLists(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const lists = yield this.listRepository.find({
                relations: {
                    category: true,
                    user: true
                },
                where: {
                    user: {
                        id: userId
                    }
                }
            });
            return lists;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const list = yield this.listRepository.findOneBy({ id: id });
            return list;
        });
    }
    getByProperty(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const list = yield this.listRepository.find(options);
            return list;
        });
    }
    createList(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdList = this.listRepository.create(data);
            yield this.listRepository.save(createdList);
        });
    }
    updateList(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.listRepository.update(id, data);
        });
    }
    deleteList(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const listToDelete = yield this.listRepository.findOneBy({ id: id });
            if (!listToDelete) {
                return null;
            }
            yield this.listRepository.remove(listToDelete);
        });
    }
}
exports.default = ListService;
//# sourceMappingURL=List.service.js.map