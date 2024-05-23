import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();
const serviceAccount: string = process.env.serviceAccount || "";

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(serviceAccount)),
  databaseURL:
    "https://fir-rest-api-57060-default-rtdb.europe-west1.firebasedatabase.app",
});

export const db = admin.firestore();
