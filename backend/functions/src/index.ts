import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { router } from "./routes";
import { db } from "./data-access";
import session from "express-session";
import FirestoreStore from "firestore-store";

// Augment express-session with a custom SessionData object
declare module "express-session" {
  interface SessionData {
    authenticated: number;
  }
}

dotenv.config();

const store = FirestoreStore(session);
const app = express();
const port = process.env.PORT;
const SESSION_SECRET = process.env.session_secret;
app.use(express.json());
app.use(cors({ credentials: true, origin: process.env.CORS_ORIGIN }));

app.use(
  session({
    store: new store({
      database: db,
    }),
    name: "__session", // required for Cloud Functions / Cloud Run
    secret: SESSION_SECRET as string,
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 60 * 24 * 1000 }, // expires in one day
  })
);

app.use("/", router);

app.listen(port, () => {
  console.log(`Server is runnning at -> http://localhost:${port}`);
});
