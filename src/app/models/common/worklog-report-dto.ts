export interface WorklogReportDTO {
  tckn: string;
  name: string;
  date: string;
  start_time: string;
  end_time: string;
  ext_hours: string;
  description?: string;
  total_time:string;
}
