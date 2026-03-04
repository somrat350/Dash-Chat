import admin from "firebase-admin";
import { ENV } from "./env.js";

if (!admin.apps.length) {
  const decoded = Buffer.from(ENV.FIREBASE_SDK, "base64").toString("utf8");
  const serviceAccount = JSON.parse(decoded);

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default admin;
