import express from "express";
import path from "path";
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

router.get("/api/invitation", getInvitation);
router.post("/api/invitations", createInvitation);
router.post("/api/login", loginController);
router.post("/api/attendances", createAttendance);
router.get("/api/attendance", getAttendance);

export { router };
