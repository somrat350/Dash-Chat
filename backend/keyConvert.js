import fs from 'fs'
// const fs = require("fs");

const key = fs.readFileSync("./dashchat-a5cb5-firebase-adminsdk-fbsvc-9e8d55b322.json", "utf8");
const base64 = Buffer.from(key).toString("base64");
console.log(base64);

