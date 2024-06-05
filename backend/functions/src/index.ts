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

const app = express();
const store = FirestoreStore(session);
process.env.NODE_ENV === "production"
  ? dotenv.config({ path: ".env.production" })
  : dotenv.config({ path: ".env.development" });

app.set("trust proxy", 1); // This allows secure cookies to be set correctly even if the proxy handles the HTTPS termination
app.use(
  cors({
    credentials: true,
    origin: process.env.CORS_ORIGIN,
    methods: ["POST", "GET"],
  }),
  express.json(),
  session({
    store: new store({
      database: db,
    }),
    name: "__session", // required for Cloud Functions / Cloud Run
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 24 * 1000, // expires in one day
      secure: JSON.parse(process.env.SECURE), // Convert string to boolean value
      sameSite: "none",
      httpOnly: true,
      path: "/",
      domain: process.env.DOMAIN,
    },
  })
);

app.use("/", router);

app.listen(process.env.PORT);

export default app;
