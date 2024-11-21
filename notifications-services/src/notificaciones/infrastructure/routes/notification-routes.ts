import express from "express";
import { notificationController } from "../dependencies";

const notificationRouter = express.Router();

notificationRouter.post(
  "/send",
  notificationController.sendVerification.bind(notificationController)
);
notificationRouter.post("/verify", notificationController.verifyToken.bind(notificationController));

export { notificationRouter };
