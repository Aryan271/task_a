import express from "express";
const router = express.Router();

import { movieController } from "../controllers";
import paginatedResults from "../middleware/pagination";
import { Movie } from "../models";

router.post("/add-movie", movieController.store);
router.get("/get-all", movieController.index);
router.get("/get-single/:id", movieController.show);
router.get(
  "/get-paginated/",
  paginatedResults(Movie),
  movieController.paginated
);

export default router;
