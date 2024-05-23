import { Request, Response } from "express";
import { db } from "../../data-access";
import { Timestamp } from "firebase-admin/firestore";

export const getAttendance = async (req: Request, res: Response) => {
  const { pin } = req.body;
  console.log(pin);
  try {
    const document = await db.collection("attendance").doc(pin);
    const doc = (await document.get()).data();
    if (doc) {
      return res.send(doc);
    } else {
      console.log("feilet");
      return res.sendStatus(404);
    }
  } catch (e) {
    return res.sendStatus(500);
  }
};

export const createAttendance = async (req: Request, res: Response) => {
  const { allergy, comment, email, attending } = req.body;
  const { authenticated } = req.session;

  try {
    await db.collection("attendance").doc(`${authenticated}`).set({
      allergy: allergy,
      email: email,
      attending: attending,
      comment: comment,
      createdAt: Timestamp.now(),
    });
    return res.sendStatus(200);
  } catch (e) {
    console.log(`${(e as Error).message} ${res}`);
  }
};
