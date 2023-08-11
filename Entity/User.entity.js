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
const Category_entity_1 = __importDefault(require("./Category.entity"));
const Rol_entity_1 = __importDefault(require("./Rol.entity"));
const List_entity_1 = __importDefault(require("./List.entity"));
let User = class User {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 75 }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 75 }),
    __metadata("design:type", String)
], User.prototype, "last_name", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 50 }),
    (0, typeorm_1.Unique)(["email"]),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 60 }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], User.prototype, "created_date", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Rol_entity_1.default, (rol) => rol.users),
    __metadata("design:type", Rol_entity_1.default)
], User.prototype, "rol", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Category_entity_1.default, (category) => category.user),
    __metadata("design:type", Array)
], User.prototype, "categories", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => List_entity_1.default, (list) => list.user),
    __metadata("design:type", Array)
], User.prototype, "Lists", void 0);
User = __decorate([
    (0, typeorm_1.Entity)()
], User);
exports.default = User;
//# sourceMappingURL=User.entity.js.map