import express from "express";
import { especialistaController } from "../dependencies";

const especialistaRouter = express.Router();

especialistaRouter.post("/", especialistaController.create.bind(especialistaController));

especialistaRouter.get("/", especialistaController.getAll.bind(especialistaController));
especialistaRouter.get("/:id", especialistaController.getById.bind(especialistaController));
especialistaRouter.put("/:id", especialistaController.update.bind(especialistaController));
especialistaRouter.delete("/:id", especialistaController.delete.bind(especialistaController));

export { especialistaRouter };
