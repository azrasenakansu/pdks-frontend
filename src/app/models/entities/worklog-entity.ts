import { Time } from "../common/time";
import { UserEntity } from "./user";

export interface Worklog {
    id: number;
    user: UserEntity;
    date: Date;
    fromTime: Time;
    toTime: Time;
  }
  