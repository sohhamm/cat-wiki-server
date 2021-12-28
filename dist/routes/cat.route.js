"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const cat_controller_1 = require("../controllers/cat.controller");
const router = express_1.default.Router();
exports.router = router;
router.route("/cats").get(cat_controller_1.getAllBreeds);
router.route("/cats/search").get(cat_controller_1.getSearchedBreeds);
router.route("/cats/:id").get(cat_controller_1.getBreedByID);
