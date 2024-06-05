import { Request, Response } from "express";
import { db } from "../../data-access";

export const loginController = async (req: Request, res: Response) => {
  const { pin } = req.body;
  const { session } = req;

  // TODO: Fix and validate
  const docRef = db.collection("invitations").where("pin", "==", pin);
  docRef
    .get()
    .then((doc) => {
      if (!doc.empty) {
        try {
          session.authenticated = pin;
          return res.status(201).send(req.session.cookie);
        } catch (e) {
          console.log((e as Error).message);
          return res.send("Not Found");
        }
      } else {
        return res.sendStatus(401);
      }
    })
    // TODO do not respnd with internal server error here
    .catch((e) => res.sendStatus(500).send(e));
};
