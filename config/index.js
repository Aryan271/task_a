const dotenv = require("dotenv");
dotenv.config();

export const { PORT, DB_URL, APP_URL } = process.env;
