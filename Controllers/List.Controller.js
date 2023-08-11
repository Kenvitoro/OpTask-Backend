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
const List_service_1 = __importDefault(require("../Services/List.service"));
const listService = new List_service_1.default();
class ListController {
    getAllLists(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.params;
            const lists = yield listService.getAllLists(parseInt(userId));
            return res.json(lists);
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const list = yield listService.getById(parseInt(id));
            return res.json(list);
        });
    }
    getByCategoryId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.categoryId;
            const list = yield listService.getByProperty({
                relations: {
                    category: true,
                },
                where: {
                    category: { id: id },
                }
            });
            return res.json(list);
        });
    }
    createList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            const list = yield listService.createList(body);
            return res.json(list);
        });
    }
    updateList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.body;
            const { tittle, description, status, category } = req.body;
            const updatedList = yield listService.updateList(parseInt(id), { tittle, description, status });
            return res.json(updatedList);
        });
    }
    deleteList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.body;
            const deletedList = yield listService.deleteList(parseInt(id));
            return res.json(deletedList);
        });
    }
}
exports.default = ListController;
//# sourceMappingURL=List.Controller.js.map