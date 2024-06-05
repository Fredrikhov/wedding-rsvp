import { Request, Response } from "express";
import { db } from "../../data-access";
import { Timestamp } from "firebase-admin/firestore";

export const getAttendance = async (req: Request, res: Response) => {
  const { authenticated } = req.session;
  try {
    if (authenticated) {
      const document = await db
        .collection("attendance")
        .doc(`${authenticated}`);
      const doc = (await document.get()).data();
      if (doc) {
        return res.status(200).send(doc);
      } else {
        console.log("feilet");
        return res.sendStatus(404);
      }
    } else {
      res.sendStatus(401);
    }
  } catch (e) {
    return res.sendStatus(500);
  }
};

export const createAttendance = async (req: Request, res: Response) => {
  const { allergy, comment, email, attending } = req.body;
  const { authenticated } = req.session;
  try {
    if (authenticated) {
      await db.collection("attendance").doc(`${authenticated}`).set({
        allergy: allergy,
        email: email,
        attending: attending,
        comment: comment,
        createdAt: Timestamp.now(),
      });
      return res.sendStatus(200);
    } else {
      return res.status(201).send("Not authenticated");
    }
  } catch (e) {
    console.log(`${(e as Error).message} ${res}`);
  }
};
