"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Task_entity_1 = __importDefault(require("./Task.entity"));
const Category_entity_1 = __importDefault(require("./Category.entity"));
const User_entity_1 = __importDefault(require("./User.entity"));
let List = class List {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], List.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 50 }),
    __metadata("design:type", String)
], List.prototype, "tittle", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], List.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean', { default: false }),
    __metadata("design:type", Boolean)
], List.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], List.prototype, "created_date", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_entity_1.default, (user) => user.Lists),
    __metadata("design:type", User_entity_1.default)
], List.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Category_entity_1.default, (category) => category.Lists),
    __metadata("design:type", Category_entity_1.default)
], List.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Task_entity_1.default, (task) => task.list),
    __metadata("design:type", Array)
], List.prototype, "tasks", void 0);
List = __decorate([
    (0, typeorm_1.Entity)()
], List);
exports.default = List;
//# sourceMappingURL=List.entity.js.map