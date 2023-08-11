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
exports.isUser = exports.isAdmin = void 0;
const dotenv = __importStar(require("dotenv"));
const User_service_1 = __importDefault(require("../Services/User.service"));
dotenv.config();
const userService = new User_service_1.default();
const isAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userid = req.userId; //recuperando el id establecido por el middleware verifyToken
    if (!userid) {
        return res.status(500).json({ "error": "internal server error" });
    }
    ;
    /*en typeorm se tienen que cargar las relaciones para traerlas a la tabla que tiene esas relaciones, ya que se encarga de traer en forma de objeto todo el registro del cual esta ralcionado y no solo traer el id del objeto como se haria em otros casos, de otra forma si solo mandas a llamar a una tabla sin especificar sus relaciones solo se llamaran a las propiedades que no tienen una relacion con otra tabla*/
    const users = yield userService.getByProperty({
        Id: parseInt(userid),
        relations: { rol: true } //y aqui cargo la el objeto rol (todo el registro de la tabla rol que esta relacionado a este usuario)
    });
    const user = users[0]; /*esta funcion me devuelve un arreglo con todos los usuarios que cumplen el el requisito de id, asi que hay que extrarlo, al ser un solo admin el arreglo solo tiene un valor*/
    if (!user) {
        return res.status(400).json({ "error": "user does not exist" });
    }
    ;
    const userRol = (_a = user.rol) === null || _a === void 0 ? void 0 : _a.name; // como la propiedad rol es un objeto del usuario puedo extraer directamente el nombre de ese rol
    if (userRol != "admin") {
        return res.status(401).json("you are not authorized");
    }
    next();
});
exports.isAdmin = isAdmin;
const isUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const userid = req.userId; //recuperando el id establecido por el middleware verifyToken
    if (!userid) {
        return res.status(500).json({ "error": "internal server error" });
    }
    ;
    /*en typeorm se tienen que cargar las relaciones para traerlas a la tabla que tiene esas relaciones, ya que se encarga de traer en forma de objeto todo el registro del cual esta ralcionado y no solo traer el id del objeto como se haria em otros casos, de otra forma si solo mandas a llamar a una tabla sin especificar sus relaciones solo se llamaran a las propiedades que no tienen una relacion con otra tabla*/
    const users = yield userService.getByProperty({
        Id: parseInt(userid),
        relations: { rol: true } //y aqui cargo la el objeto rol (todo el registro de la tabla rol que esta relacionado a este usuario)
    });
    const user = users[0]; /*esta funcion me devuelve un arreglo con todos los usuarios que cumplen el el requisito de id, asi que hay que extrarlo, al ser un solo admin el arreglo solo tiene un valor*/
    if (!user) {
        return res.status(400).json({ "error": "user does not exist" });
    }
    ;
    const userRol = (_b = user.rol) === null || _b === void 0 ? void 0 : _b.name; // como la propiedad rol es un objeto del usuario puedo extraer directamente el nombre de ese rol
    if (userRol != "user") {
        return res.status(401).json("you are not authorized");
    }
    next();
});
exports.isUser = isUser;
//# sourceMappingURL=VerificationRol.js.map