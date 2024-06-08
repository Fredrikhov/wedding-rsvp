import { Request, Response } from "express";
import { db } from "../../data-access";

export const loginController = async (req: Request, res: Response) => {
  const { pin } = req.body;
  const { session } = req;
  const docRef = db.collection("invitations").where("pin", "==", pin);
  docRef
    .get()
    .then((doc) => {
      if (!doc.empty) {
        session.authenticated = pin;
        res.cookie("token", pin, {
          maxAge: 60 * 60 * 24 * 1000,
          secure: JSON.parse(process.env.SECURE),
          sameSite: "none",
          httpOnly: false,
          path: "/",
          domain: process.env.DOMAIN,
        });
        return res.status(201).send();
      } else {
        return res.status(401).send("Not Found");
      }
    })
    .catch((e) => res.sendStatus(500).send(e));
};

export const logoutController = async (req: Request, res: Response) => {
  try {
    res.clearCookie("token", {
      httpOnly: false,
      secure: JSON.parse(process.env.SECURE),
      sameSite: "none",
      maxAge: 0,
      path: "/",
      domain: process.env.DOMAIN,
      expires: new Date(0),
    });
    res.sendStatus(201);
  } catch (e) {
    res.sendStatus(500).send(e);
  }
};
