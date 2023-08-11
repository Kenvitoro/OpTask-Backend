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
const Category_entity_1 = __importDefault(require("../Entity/Category.entity"));
const database_1 = require("../config/database");
class CategoryService {
    constructor() {
        this.categoryRepository = database_1.Database.getRepository(Category_entity_1.default);
    }
    getAllCategories(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const categories = yield this.categoryRepository.find({
                relations: {
                    user: true
                },
                where: { user: {
                        id: userId
                    } }
            });
            return categories;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield this.categoryRepository.findOneBy({ id: id });
            return category;
        });
    }
    createCategory(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdCategory = this.categoryRepository.create(data);
            const savedCategory = yield this.categoryRepository.save(createdCategory);
            return savedCategory;
        });
    }
    updateCategory(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.categoryRepository.update(id, data);
        });
    }
    deleteCategory(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const categoryToDelete = yield this.categoryRepository.findOneBy({ id: id });
            if (!categoryToDelete) {
                return null;
            }
            yield this.categoryRepository.remove(categoryToDelete);
        });
    }
}
exports.default = CategoryService;
//# sourceMappingURL=Category.service.js.map