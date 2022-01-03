import express from "express";
import {
  getAllBreeds,
  getBreedByID,
  getSearchedBreeds,
  getTopBreeds,
  incrementSearchCount,
} from "../controllers/cat.controller";

const router = express.Router();

router.route("/cats").get(getAllBreeds);
router.route("/cats/search").get(getSearchedBreeds);
router.route("/cats/top-breeds").get(getTopBreeds).post(incrementSearchCount);
router.route("/cats/:id").get(getBreedByID);

export { router };
