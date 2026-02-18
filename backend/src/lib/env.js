import "dotenv/config";

export const ENV = {
  PORT: process.env.PORT,
  DB_URI: process.env.DB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  CLIENT_URL: process.env.CLIENT_URL,
};
