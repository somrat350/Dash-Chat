import "dotenv/config";

export const ENV = {
  PORT: process.env.PORT,
  DB_URI: process.env.DB_URI,
  FIREBASE_SDK: process.env.FIREBASE_SDK,
  CLIENT_URL: process.env.CLIENT_URL,
  NODE_ENV: process.env.NODE_ENV,
  SAME_SITE: process.env.SAME_SITE,
};
