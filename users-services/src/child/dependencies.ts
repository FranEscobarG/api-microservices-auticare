import { PostgresChildRepository } from "./infrastructure/repositories/postgres-child-repository";
import { CreateChildUseCase } from "./application/create-child-usecase";
import { GetChildrenByTutorUseCase } from "./application/get-children-by-tutor-usecase";
import { GetChildDetailsUseCase } from "./application/get-child-details-usecase";
import { ChildController } from "./infrastructure/controllers/child-controller";

const childRepository = new PostgresChildRepository();

const createChildUseCase = new CreateChildUseCase(childRepository);
const getChildrenByTutorUseCase = new GetChildrenByTutorUseCase(childRepository);
const getChildDetailsUseCase = new GetChildDetailsUseCase(childRepository);

export const childController = new ChildController(
    createChildUseCase,
    getChildrenByTutorUseCase,
    getChildDetailsUseCase
);