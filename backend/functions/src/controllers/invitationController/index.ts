import { Request, Response } from "express";
import { db } from "../../data-access";

export const createInvitation = async (req: Request, res: Response) => {
  try {
    await db.collection("invitations").doc(req.body.pin).set({
      pin: req.body.pin,
      gust1: req.body.guest1,
      guest2: req.body.guest2,
    });
    return res.status(200).send();
  } catch (e) {
    res.status(500).send(e);
  }
};

export const getInvitation = async (req: Request, res: Response) => {
  const { authenticated } = req.session;
  try {
    if (authenticated) {
      const document = await db
        .collection("invitations")
        .doc(`${authenticated}`);
      const doc = (await document.get()).data();
      if (doc) {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(doc);
      } else {
        res.sendStatus(404);
      }
    } else {
      res.sendStatus(401);
    }
  } catch (e) {
    return res.sendStatus(500);
  }
};
