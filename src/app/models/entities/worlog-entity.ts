import { Time } from "../common/time";
import { UserEntity } from "./user-entity";

export interface Worklog {
    id: number;
    user: UserEntity;
    date: Date;
    fromTime: Time;
    toTime: Time;
  }
  