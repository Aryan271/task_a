import CustomErrorHandler from "../services/customErrorHandler";

function paginatedResults(model) {
  return async (req, res, next) => {
    const page = parseInt(req.query.page);
    const size = parseInt(req.query.size);

    const startIndex = (page - 1) * size;
    const endIndex = page * size;

    let results = {};

    if (endIndex < (await model.countDocuments().exec())) {
      results.next = {
        page: page + 1,
        size: size,
      };
    }

    if (startIndex - 1 > 0) {
      results.previous = {
        page: page - 1,
        size: size,
      };
    }

    try {
      results.results = await model.find().limit(size).skip(startIndex).exec();
    } catch (err) {
      return next(CustomErrorHandler.serverError());
    }

    res.paginatedResults = results;
    next();
  };
}

export default paginatedResults;
