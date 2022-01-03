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
exports.connectDB = void 0;
const typeorm_1 = require("typeorm");
const cat_1 = require("./entities/cat");
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname + "../.env") });
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const options = {
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "me",
        password: process.env.DEV_DB_PASSWORD,
        database: "cat_wiki",
        entities: [cat_1.Cat],
        synchronize: true,
        // ssl: { rejectUnauthorized: false },
    };
    if (process.env.NODE_ENV === "production") {
        Object.assign(options, {
            url: process.env.DATABASE_URL,
            ssl: { rejectUnauthorized: false },
        });
    }
    yield (0, typeorm_1.createConnection)(options);
});
exports.connectDB = connectDB;
