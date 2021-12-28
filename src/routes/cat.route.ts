import express from "express";
import {
  getAllBreeds,
  getBreedByID,
  getSearchedBreeds,
} from "../controllers/cat.controller";

const router = express.Router();

router.route("/cats").get(getAllBreeds);
router.route("/cats/search").get(getSearchedBreeds);
router.route("/cats/:id").get(getBreedByID);

export { router };
