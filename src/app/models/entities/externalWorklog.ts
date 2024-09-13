import { ExternalWorklogType } from '../common/externalworklog-enum';

export interface ExternalWorklog {
  id?: number;
  userTckn: string;
  date: string;
  from: string;
  to: string;
  isApproved: boolean|null;
  type: ExternalWorklogType;
  description?: string;
}
