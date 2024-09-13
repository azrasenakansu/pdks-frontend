import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { lastValueFrom } from 'rxjs';
import { Worklog } from '../models/entities/worklog';
import { ExternalWorklog } from '../models/entities/externalWorklog';
import { HttpParams } from '@angular/common/http';
import { Page } from '../models/common/page';

@Injectable({
  providedIn: 'root',
})
export class ExternalWorklogsService extends ApiService {
  async getExternalWorklog(page: number, size: number) {
    let params = new HttpParams()
    .set('page', page)
    .set('size', size);
    return await lastValueFrom(
      this.client.get<Page<ExternalWorklog>>(this.baseUrl + 'externalWorklogs', {params})
    );
  }

  async deleteExternalWorklog(id: number) {
    return await lastValueFrom(
      this.client.delete<never>(this.baseUrl + `externalWorklogs/${id}`)
    );
  }

  async updateExternalWorklog(id: number, updatedWorklog: ExternalWorklog) {
    return await lastValueFrom(
      this.client.put<never>(
        this.baseUrl + `externalWorklogs/${id}`,
        updatedWorklog
      )
    );
  }

  async approveExternalWorklog(id: number, state: boolean | null) {
    const stateParam = state === null ? 2 : state === true ? 1 : 0;
    return await lastValueFrom(
      this.client.patch<never>(
        this.baseUrl + `externalWorklogs/approve/${id}/${stateParam}`,
        null
      )
    );
  }

  async createExternalWorklog(newWorklog: ExternalWorklog) {
    return await lastValueFrom(
      this.client.post<never>(
        this.baseUrl + 'externalWorklogs/create',
        newWorklog
      )
    );
  }

  async pendingExternalWorklog(page: number, size: number) {
    let params = new HttpParams()
    .set('page', page)
    .set('size', size);
    return await lastValueFrom(
      this.client.get<Page<ExternalWorklog>>(
        this.baseUrl + 'externalWorklogs/pending', {params}
      )
    );
  }

  async rejectedExternalWorklog(page: number, size: number) {
    let params = new HttpParams()
    .set('page', page)
    .set('size', size);
    return await lastValueFrom(
      this.client.get<Page<ExternalWorklog>>(
        this.baseUrl + 'externalWorklogs/rejected', {params}
      )
    );
  }

  async getApprovedExternalWorklog(page: number, size: number) {
    let params = new HttpParams()
    .set('page', page)
    .set('size', size);
    return await lastValueFrom(
      this.client.get<Page<ExternalWorklog>>(
        this.baseUrl + 'externalWorklogs/approved', {params}
      )
    );
  }
}
