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
exports.fetcher = void 0;
const _importDynamic = new Function("modulePath", "return import(modulePath)");
function fetch(...args) {
    return __awaiter(this, void 0, void 0, function* () {
        const { default: fetch } = yield _importDynamic("node-fetch");
        return fetch(...args);
    });
}
const URL = `https://api.thecatapi.com/v1`;
const fetcher = (endpoint, payload, method = "get", _headers) => __awaiter(void 0, void 0, void 0, function* () {
    const apiKey = process.env.CAT_WIKI_API_KEY;
    try {
        const res = yield (yield fetch(URL + endpoint, {
            method,
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json",
                "x-api-key": apiKey,
                // ...headers,
            },
        })).json();
        return res;
    }
    catch (err) {
        console.error(err);
        return { msg: err };
    }
});
exports.fetcher = fetcher;
