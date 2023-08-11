"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./config/database");
const auth_Routes_1 = __importDefault(require("./Routes/auth.Routes"));
const User_Routes_1 = __importDefault(require("./Routes/User.Routes"));
const Category_Routes_1 = __importDefault(require("./Routes/Category.Routes"));
const Task_Routes_1 = __importDefault(require("./Routes/Task.Routes"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const List_Routes_1 = __importDefault(require("./Routes/List.Routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)({
    exposedHeaders: ['Authorization']
}));
app.use((0, helmet_1.default)());
app.use('/Auth', auth_Routes_1.default);
app.use('/api', User_Routes_1.default);
app.use('/api', Category_Routes_1.default);
app.use('/api', Task_Routes_1.default);
app.use('/api', List_Routes_1.default);
database_1.Database.initialize()
    .then(() => {
    console.log("base de datos conectada");
});
app.get("/", (req, res) => {
    res.send({ "message": "hola a todos" });
});
exports.default = app;
//# sourceMappingURL=index.js.map