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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBreedByID = exports.getSearchedBreeds = exports.getAllBreeds = void 0;
const fetch_1 = require("../utils/fetch");
const getAllBreeds = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, fetch_1.fetcher)("/breeds");
    return res.json(data);
});
exports.getAllBreeds = getAllBreeds;
const getSearchedBreeds = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query.q || "";
    const data = yield (0, fetch_1.fetcher)(`/breeds/search?q=${query}`);
    return res.json(data);
});
exports.getSearchedBreeds = getSearchedBreeds;
const getBreedByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = yield (0, fetch_1.fetcher)(`/images/search?breed_ids=${id}`);
    return res.json(data);
});
exports.getBreedByID = getBreedByID;
