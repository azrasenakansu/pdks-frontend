import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { lastValueFrom } from 'rxjs';
import { Worklog } from '../models/entities/worklog';

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
}
