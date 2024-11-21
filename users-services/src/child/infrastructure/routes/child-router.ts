import { Router } from "express";
import { childController } from "../../dependencies";

const childRouter = Router();

childRouter.post("/", childController.createChild.bind(childController));
childRouter.get("/tutor/:tutorId", childController.getChildrenByTutor.bind(childController));
childRouter.get("/:childId", childController.getChildDetails.bind(childController));

export { childRouter };
