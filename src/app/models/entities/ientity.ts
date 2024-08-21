export interface IEntity {
    _id: string;
    _status: Status;
    _createdAt: Date | null;
    _createdBy: string;
    _modifiedAt: Date | null;
    _modifiedBy: string;
}

export enum Status {
    Active = 0,
    Inactive = 1
}