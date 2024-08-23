import { ExternalWorklogType } from '../common/externalworklog-enum';
import { Time } from '../common/time';

export interface ExternalWorklog {
  id?: number;
  userTckn: string;
  date: Date;
  from: string;
  to: string;
  isApproved: boolean|null;
  type: ExternalWorklogType;
  description?: string;
}
