import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { lastValueFrom } from 'rxjs';
import { Worklog } from '../models/entities/worklog';
import { HttpParams, HttpResponse } from '@angular/common/http';
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

  async getWorklogReports(
    startDate: Date,
    endDate: Date,
    tckns?: string[]
  ) {
    let params = new HttpParams()
      .set('startDate', formatDate(startDate,'YYYY-MM-dd','en-US'))
      .set('endDate', formatDate(endDate,'YYYY-MM-dd','en-US'));

    if (tckns && tckns.length > 0) {
      tckns.forEach(tckn => {
        params = params.append('tckns', tckn);
      });    }

    return await lastValueFrom(
      this.client.get<WorklogReportDTO[]>(`${this.baseUrl}worklogs/report`, {
        params,
      })
    );
  }

  async downloadWorklogReport(
    startDate: Date,
    endDate: Date,
    tckns?: string[]
  ) : Promise<HttpResponse<Blob>> {
    let params = new HttpParams()
      .set('startDate', formatDate(startDate,'YYYY-MM-dd','en-US'))
      .set('endDate', formatDate(endDate,'YYYY-MM-dd','en-US'));
    if (tckns && tckns.length > 0) {
      tckns.forEach(tckn => {
        params = params.append('tckns', tckn);
      });    
    }
    return await lastValueFrom(this.client.get<Blob>(`${this.baseUrl}worklogs/report/export`, { params, observe: 'response', responseType: 'blob' as 'json'}));
  }
}
