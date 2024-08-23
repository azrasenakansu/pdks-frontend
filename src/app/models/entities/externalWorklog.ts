import { ExternalWorklogType } from '../common/externalworklog-enum';
import { Time } from '../common/time';

export interface ExternalWorklog {
  id?: number;
  userTckn: string;
  date: Date;
  from: Time;
  to: Time;
  isApproved: boolean|null;
  type: ExternalWorklogType;
  description?: string;
}
