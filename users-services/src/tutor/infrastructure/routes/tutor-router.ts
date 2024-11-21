import express from "express";
import { tutorController } from "../dependencies";

const tutorRouter = express.Router();

tutorRouter.post("/", tutorController.create.bind(tutorController));

tutorRouter.get("/", tutorController.getAll.bind(tutorController));
tutorRouter.get("/:id", tutorController.getById.bind(tutorController));
tutorRouter.put("/:id", tutorController.update.bind(tutorController));
tutorRouter.delete("/:id", tutorController.delete.bind(tutorController));

export { tutorRouter };
