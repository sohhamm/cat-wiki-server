import express from "express";
import { getAllBreeds } from "../controllers/cat.controller";

const router = express.Router();

router.route("/breeds").get(getAllBreeds);

export { router };
