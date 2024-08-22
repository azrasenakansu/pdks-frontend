import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { lastValueFrom } from 'rxjs';
import { Worklog } from '../models/entities/worklog-entity';

@Injectable({
  providedIn: 'root'
})
export class ExternalWorklogsService extends ApiService{

  async getExternalWorklog(){
    return await lastValueFrom(
      this.client.get<Worklog>(this.baseUrl + '/externalWorklogs')
    );
  }

  async deleteExternalWorklog(id: string){
    return await lastValueFrom(
      this.client.delete<never>(this.baseUrl + `externalWorklogs/${id}`)
    );
  }

  async updateExternalWorklog(id: string, updatedWorklog: Worklog){
    return await lastValueFrom(
      this.client.put<never>(this.baseUrl + `externalWorklogs/${id}`, updatedWorklog)
    );
  }

  async approveExternalWorklog(id: string, approvedWorklog: Worklog){
    return await lastValueFrom(
      this.client.patch<never>(this.baseUrl + `externalWorklogs/${id}`,approvedWorklog)
    );
  }

  async createExternalWorklog(newWorklog: Worklog){
    return await lastValueFrom(
      this.client.post<never>(this.baseUrl + '/externalWorklogs/create', newWorklog)
    );
  }

  async pendingExternalWorklog(){
    return await lastValueFrom(
      this.client.get<Worklog>(this.baseUrl + '/externalWorklogs/pending')
    );
  }

}
