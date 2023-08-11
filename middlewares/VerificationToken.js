"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const VerifyToken = (req, res, next) => {
    var _a;
    try {
        const token = (_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token) {
            return res.status(401).json({ "message": "Token is required" });
        }
        const secret = process.env.jwt_SECRET;
        if (!secret) {
            return res.status(500).json({ "message": "Server Error" });
        }
        const verificatedToken = jsonwebtoken_1.default.verify(token, secret);
        if (!verificatedToken) {
            return res.status(401).json({ "message": "unexpected Token" });
        }
        req.userId = verificatedToken.id;
        next();
    }
    catch (error) {
        res.json({ "Error": error });
    }
};
exports.VerifyToken = VerifyToken;
//# sourceMappingURL=VerificationToken.js.map