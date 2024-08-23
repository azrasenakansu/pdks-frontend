import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { lastValueFrom } from 'rxjs';
import { Worklog } from '../models/entities/worklog';
import { ExternalWorklog } from '../models/entities/externalWorklog';

@Injectable({
  providedIn: 'root'
})
export class ExternalWorklogsService extends ApiService{

  async getExternalWorklog(){
    return await lastValueFrom(
      this.client.get<ExternalWorklog[]>(this.baseUrl + 'externalWorklogs')
    );
  }

  async deleteExternalWorklog(id: number){
    return await lastValueFrom(
      this.client.delete<never>(this.baseUrl + `externalWorklogs/${id}`)
    );
  }

  async updateExternalWorklog(id: number, updatedWorklog: ExternalWorklog){
    return await lastValueFrom(
      this.client.put<never>(this.baseUrl + `externalWorklogs/${id}`, updatedWorklog)
    );
  }

  async approveExternalWorklog(id: number, state: boolean | null){
    const stateParam = state === null ? 2 : state === true ? 1 : 0;
    return await lastValueFrom(
      this.client.patch<never>(this.baseUrl + `externalWorklogs/approve/${id}/${stateParam}`, null)
    );
  }

  async createExternalWorklog(newWorklog: ExternalWorklog){
    return await lastValueFrom(
      this.client.post<never>(this.baseUrl + 'externalWorklogs/create', newWorklog)
    );
  }

  async pendingExternalWorklog(){
    return await lastValueFrom(
      this.client.get<ExternalWorklog[]>(this.baseUrl + 'externalWorklogs/pending')
    );
  }

}
