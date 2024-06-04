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
const SESSION_SECRET = process.env.SESSION_SECRET;

process.env.NODE_ENV === "production"
  ? dotenv.config({ path: ".env.production" })
  : // app.use(express.static("dist"))
    dotenv.config({ path: ".env.development" }) &&
    console.log("Loading development");

const oneDay = 60 * 60 * 24 * 1000;
app.use(
  cors({
    credentials: true,
    origin: process.env.CORS_ORIGIN,
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
  }),
  express.json(),
  session({
    store: new store({
      database: db,
    }),
    name: "__session", // required for Cloud Functions / Cloud Run
    secret: SESSION_SECRET as string,
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: oneDay, // expires in one day
      secure: JSON.parse(process.env.SECURE), // Convert string to boolean value
      sameSite: "none",
      httpOnly: true,
      // signed: false,
      domain: process.env.DOMAIN,
    },
  })
);

app.use("/", router);

app.listen(port);

export default app;
