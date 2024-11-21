import { NextFunction, Request, Response } from "express";
import { CreateChildUseCase } from "../../application/create-child-usecase";
import { GetChildrenByTutorUseCase } from "../../application/get-children-by-tutor-usecase";
import { GetChildDetailsUseCase } from "../../application/get-child-details-usecase";

export class ChildController {
    constructor(
        private createChildUseCase: CreateChildUseCase,
        private getChildrenByTutorUseCase: GetChildrenByTutorUseCase,
        private getChildDetailsUseCase: GetChildDetailsUseCase
    ) {}

    async createChild(req: Request, res: Response, next: NextFunction): Promise<void> {
        const childPayload = req.body; // Se obtiene el payload
        try {
            const child = await this.createChildUseCase.execute(childPayload);
            res.status(201).json(child);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
            next(error);
        }
    }

    async getChildrenByTutor(req: Request, res: Response, next: NextFunction): Promise<void> {
        const tutorId = req.params.tutorId;
        try {
            const children = await this.getChildrenByTutorUseCase.execute(tutorId);
            res.status(200).json(children);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
            next(error)
        }
    }

    async getChildDetails(req: Request, res: Response, next: NextFunction): Promise<void> {
        const childId = req.params.childId;
        try {
            const child = await this.getChildDetailsUseCase.execute(childId);
            res.status(200).json(child);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
            next(error);
        }
    }
}
