import admin from "../lib/firebase.js";

export const isAuthenticated = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send({ message: "unauthorized access" });
  }
  try {
    const idToken = token.split(" ")[1];
    const decoded = await admin.auth().verifyIdToken(idToken);
    if (!decoded) {
      return res.status(401).send({ message: "unauthorized access" });
    }
    req.decoded_email = decoded.email;
    next();
  } catch (err) {
    console.log("error in auth middleware - isAuthenticated ", err);
    return res.status(401).send({ message: "unauthorized access" });
  }
};
