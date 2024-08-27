import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { lastValueFrom } from 'rxjs';
import { Worklog } from '../models/entities/worklog';
import { HttpParams } from '@angular/common/http';
import { WorklogReportDTO } from '../models/common/worklog-report-dto';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class WorklogEndpointService extends ApiService {
  async getWorklogs() {
    return await lastValueFrom(
      this.client.get<Worklog[]>(this.baseUrl + 'worklogs')
    );
  }

  async getWorklogsByTckn() {
    return await lastValueFrom(
      this.client.get<Worklog[]>(this.baseUrl + 'worklogs/${tckn}')
    );
  }

  async getWorklogReports(
    startDate: Date,
    endDate: Date,
    tckns?: string[]
  ) {
    let params = new HttpParams()
      .set('startDate', formatDate(startDate,'YYYY-MM-dd','en-US'))
      .set('endDate', formatDate(endDate,'YYYY-MM-dd','en-US'));

    if (tckns && tckns.length > 0) {
      params = params.set('tckns', tckns.join(','));
    }

    return await lastValueFrom(
      this.client.get<WorklogReportDTO[]>(`${this.baseUrl}worklogs/report`, {
        params,
      })
    );
  }
}
