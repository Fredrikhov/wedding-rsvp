import express from "express";

import {
  loginController,
  logoutController,
} from "../controllers/AuthController";
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
router.post("/api/logout", logoutController);

export { router };
