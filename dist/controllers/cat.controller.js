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
exports.seedDB = exports.getTopBreeds = exports.incrementSearchCount = exports.getBreedByID = exports.getSearchedBreeds = exports.getAllBreeds = void 0;
const fetch_1 = require("../utils/fetch");
const cat_1 = require("../entities/cat");
const most_searched_1 = require("../most-searched");
const getAllBreeds = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, fetch_1.fetcher)("/breeds");
    return res.json(data);
});
exports.getAllBreeds = getAllBreeds;
const getSearchedBreeds = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { q = "" } = req.query;
    const data = yield (0, fetch_1.fetcher)(`/breeds/search?q=${q}`);
    return res.json(data);
});
exports.getSearchedBreeds = getSearchedBreeds;
const getBreedByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { id = "" } = req.params;
    const data = yield (0, fetch_1.fetcher)(`/images/search?breed_ids=${id}&limit=8`, undefined, "get");
    const resp = ((_a = data[0]) === null || _a === void 0 ? void 0 : _a.breeds[0]) || {};
    resp.url = (_b = data[0]) === null || _b === void 0 ? void 0 : _b.url;
    const images = data.map((obj) => obj.url);
    return res.json({ data: resp, images });
});
exports.getBreedByID = getBreedByID;
const incrementSearchCount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    let msg = { msg: "cat not found", name: "" };
    // console.log({ mostSearched });
    // const mostSearched = JSON.parse(await readFile("./search.json".toString()));
    // mostSearched.forEach((cat, idx) => {
    //   if (cat.name.toLowerCase().includes(name.toLowerCase())) {
    //     cat.count++;
    //     // updateCount(idx);
    //     msg.msg = "successfully incremented search count";
    //     msg.name = cat.name.toLowerCase();
    //   }
    // });
    return res.json(msg);
});
exports.incrementSearchCount = incrementSearchCount;
const getTopBreeds = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const limit = Number(req.query.limit) || 10;
    const top_cats = yield cat_1.Cat.find({});
    console.log(top_cats);
    return res.json(top_cats.sort((a, b) => (a.count > b.count ? -1 : 1)).slice(0, limit + 1));
});
exports.getTopBreeds = getTopBreeds;
const seedDB = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    for (let obj of most_searched_1.mostSearched) {
        const cat = new cat_1.Cat();
        cat.id = obj.id;
        cat.name = obj.name;
        cat.description = obj.description;
        cat.count = 0;
        cat.url = ((_c = obj.image) === null || _c === void 0 ? void 0 : _c.url) || "";
        yield cat.save();
    }
    res.json({ msg: "done" });
});
exports.seedDB = seedDB;
