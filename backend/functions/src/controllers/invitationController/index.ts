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
    console.log(`${(e as Error).message} ${res}`);
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
        res.send(doc);
      } else {
        res.sendStatus(404);
      }
    } else {
      // unauthorized
      res.sendStatus(401);
    }
  } catch (e) {
    return res.sendStatus(500);
  }
};
