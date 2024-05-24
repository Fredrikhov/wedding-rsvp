import express from "express";
import { loginController } from "../controllers/LoginController";
import {
  createInvitation,
  getInvitation,
} from "../controllers/invitationController";
import {
  getAttendance,
  createAttendance,
} from "../controllers/AttendanceController";

const router = express.Router();

router.get("/invitation", getInvitation);
router.get("/invitation", createInvitation);
router.post("/login", loginController);
router.post("/attendance", createAttendance);
router.get("/attendance", getAttendance);

export { router };
