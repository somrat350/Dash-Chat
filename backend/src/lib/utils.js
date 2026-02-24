import admin from "firebase-admin";
const decoded = Buffer.from(process.env.FIREBASE_SDK, "base64").toString(
  "utf8",
);
const serviceAccount = JSON.parse(decoded);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
