import Joi from "joi";

const movieSchema = Joi.object({
  name: Joi.string().required(),
  rating: Joi.number().required(),
  description: Joi.string().required(),
});

export default movieSchema;
