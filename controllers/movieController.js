import movieSchema from "../validators/movieValidator";
import { Movie } from "../models";
import multer from "multer";
import path from "path";
import CustomErrorHandler from "../services/customErrorHandler";
import fs from "fs";

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;

    cb(null, uniqueName);
  },
});

const handleMultipartData = multer({
  storage,
  limits: { fileSize: 1000000 * 5 },
}).single("image"); // max file size = 5mb

const movieController = {
  async store(req, res, next) {
    // Multipart form data
    handleMultipartData(req, res, async (err) => {
      if (err) {
        console.log(err);
        return next(CustomErrorHandler.serverError(err.message));
      }
      const filePath = req.file.path;

      // validation
      const { error } = movieSchema.validate(req.body);

      if (error) {
        // Delete the uploaded file
        fs.unlink(`${appRoot}/${filePath}`, (err) => {
          if (err) {
            return next(CustomErrorHandler.serverError(err.message));
          }
        });

        return next(error);
        // rootfolder/uploads/filename.png
      }

      const { name, rating, description } = req.body;

      // save new movie object
      let document;
      try {
        document = await Movie.create({
          name,
          rating,
          description,
          image: filePath,
        });
      } catch (err) {
        return next(err);
      }
      res.status(201).json(document);
    });
  },

  // get all movies
  async index(req, res, next) {
    let documents;

    try {
      documents = await Movie.find();
    } catch (err) {
      return next(CustomErrorHandler.serverError());
    }
    return res.json(documents);
  },

  // get single movie
  async show(req, res, next) {
    let document;
    try {
      document = await Movie.findOne({ _id: req.params.id }).select(
        "-updatedAt -__v"
      );
    } catch (err) {
      return next(CustomErrorHandler.serverError());
    }
    return res.json(document);
  },

  // get paginated movie
  async paginated(req, res, next) {
    return res.json(res.paginatedResults);
  },
};

export default movieController;
