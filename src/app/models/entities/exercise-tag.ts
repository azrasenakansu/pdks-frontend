import { IEntity } from "./ientity";

export interface ExerciseTag extends IEntity {
    name: string;
    description: string;
    color: string;
}