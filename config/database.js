"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const typeorm_1 = require("typeorm");
require("reflect-metadata");
const Category_entity_1 = __importDefault(require("../Entity/Category.entity"));
const User_entity_1 = __importDefault(require("../Entity/User.entity"));
const Rol_entity_1 = __importDefault(require("../Entity/Rol.entity"));
const dotenv = __importStar(require("dotenv"));
const List_entity_1 = __importDefault(require("../Entity/List.entity"));
const Task_entity_1 = __importDefault(require("../Entity/Task.entity"));
dotenv.config();
exports.Database = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.host_DB,
    port: process.env.port_DB ? parseInt(process.env.port_DB) : undefined,
    username: process.env.username_DB,
    password: process.env.password_DB,
    database: process.env.database_DB,
    synchronize: true,
    entities: [User_entity_1.default, Category_entity_1.default, Task_entity_1.default, Rol_entity_1.default, List_entity_1.default]
});
//# sourceMappingURL=database.js.map