import express from "express";
import { donacionController } from "../dependencies";

const donationRouter = express.Router();

donationRouter.post("/", donacionController.create.bind(donacionController));
donationRouter.get("/success", donacionController.save.bind(donacionController));

donationRouter.get("/failure", (res: express.Response) => {
    res.send("Pago fallido");
});
donationRouter.get("/pending", (res: express.Response) => {
    res.send("Pago pendiente...");
});

donationRouter.get("/", donacionController.getAll.bind(donacionController));
donationRouter.get("/:id", donacionController.getDonationByUserId.bind(donacionController));

export { donationRouter };
