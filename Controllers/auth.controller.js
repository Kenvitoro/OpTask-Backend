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
const User_service_1 = __importDefault(require("../Services/User.service"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const userService = new User_service_1.default();
class AuthController {
    //Registro
    signUp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            /*todo el bloque de codigo que quiero que funcione lo contengo dentro de un try-catch, para que cuando ocurra la ejecucion del programa pare y notifique el error*/
            try {
                //obtengo los datos del cuerpo de la peticion http, y uso la destructuracion para declarar las varibles con el mismo nombre
                const { name, lastName, email, password } = req.body;
                //utilizo un metodo de US para buscar si existe un usuario ya en la BD con el mismo email
                const userExists = yield userService.getByProperty({ where: { "email": email } });
                const userExist = userExists[0];
                //aqui manejo el caso en el que si exista el usuario, respondiendo que ya ese email lo posee un usuario ya registrado en la BD
                if (userExist)
                    return res.status(400).json({ "message": "Email is already used" });
                //creacion de la salt para encriptar la contraseña
                const salt = yield bcrypt_1.default.genSalt(10);
                //encriptacion de la contraseña
                const hashedPassword = yield bcrypt_1.default.hash(password, salt);
                /*si no existe un usuario con ese email creo un nuevo usuario usando un metodo de US y guardo el mismo objeto de la destructuracion, aqui tambien era posible llamar a la clase User que se encuentra en entity crear una nueva instancia y igualar sus propiedades a los valores optenidos el cuerpo de la peticion*/
                const createdUser = yield userService.createUser({ name, last_name: lastName, email, password: hashedPassword });
                //aqui creo una variable que almacene la varible de entorno que guarda el secreto que usare para mi token
                const secret = process.env.jwt_SECRET;
                //esta varible fue creada para manejar el caso en el que esta varible sea undefined, creando una respuesta a este caso
                if (!secret) {
                    return res.status(500).json({ message: "Server Error" });
                }
                /* se crea el token utilixando el id del usuario que se acaba de crear, el secreto y un objeto el que defino el tiempo vigente del token en segundos*/
                const token = jsonwebtoken_1.default.sign({ id: createdUser.id, name: createdUser.name, lastName: createdUser.last_name, email: createdUser.email }, secret, {
                    expiresIn: 86400
                });
                /*devuelvo el por header el token que sera almacenado por el frontend */
                return res.header("Authorization", `Bearer ${token}`)
                    .json({ message: "Registro exitoso", usuario: createdUser });
            }
            catch (error) {
                console.log(error.message);
            }
        });
    }
    //Inicio de sesion
    signIn(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //obtengo los datos del cuerpo de la peticion http, y uso la destructuracion para declarar las varibles con el mismo nombre
                const { email, password } = req.body;
                //utilizo un metodo de US para buscar si existe un usuario ya en la BD con el mismo email
                const usersExists = yield userService.getByProperty({ where: { email: email } });
                /*al contrario que al anterior, aqui verifico si el usuario no existe y manejo ese caso informando que ese usuario no existe con ese email*/
                if (!usersExists)
                    res.json({ "message": "the email or password was incorrect" });
                /*ahora si existe lo extraigo de del array que me da la funcion getByProperty ya que esta busca a todos los usuarios en la base de datos con ese mismo email, pero que al ser una propiedad unica solo un usuario la puede tener*/
                const userExists = usersExists[0];
                //extraigo la contraseña de ese usuario
                const userPassword = userExists.password;
                //confirmo que la contraseña tenga un valor (cosas de typescrypt) 
                if (!userPassword) {
                    res.json({ "message": "user password is undefined" });
                    return;
                }
                // creo una variable que alamacene el valor booleano de si la contraseña encryptada de la base de datos coincide con la ingresada
                const passwordRight = bcrypt_1.default.compareSync(password, userPassword);
                /*en caso de que no coincida manejo el caso respondiendo que el email o contraseña es incorrecta, pese a que se que lo incorrecto es la contraseña se responde que ambos pueden ser incorrectos por cuestiones de seguridad*/
                if (!passwordRight)
                    return res.json({ "message": "the email or password was incorrect" });
                //aqui creo una variable que almacene la varible de entorno que guarda el secreto que usare para mi token
                const secret = process.env.jwt_SECRET;
                //esta varible fue creada para manejar el caso en el que esta varible sea undefined, creando una respuesta a este caso
                if (!secret) {
                    return res.status(500).json({ message: "Server Error" });
                }
                /*se crea el token utilixando el id del usuario que se encontro en la BD, el secreto y un objeto el que defino el tiempo vigente del token en segundos*/
                const token = jsonwebtoken_1.default.sign({ id: userExists.id, name: userExists.name, lastName: userExists.last_name, email: userExists.email }, secret, {
                    expiresIn: 86400
                });
                /*devuelvo el por header el token que sera almacenado por el frontend */
                res.header("Authorization", `Bearer ${token}`).json({ message: "Autenticacion exitosa" });
                // Llamar a next() para pasar el control al siguiente middleware ya con el nuevo usuario registrado
                next();
            }
            catch (error) {
                console.log(error.message);
            }
        });
    }
}
exports.default = AuthController;
//# sourceMappingURL=auth.controller.js.map