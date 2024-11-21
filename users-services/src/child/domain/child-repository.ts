import { Child } from "./child";

export interface ChildRepository {
    createChild(child: Child): Promise<Child>;
    getChildrenByTutor(tutorId: string): Promise<Child[]>;
    getChildDetails(childId: string): Promise<Child | null>;
}
