import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImportService extends ApiService {

  async uploadWorklog(file:File) {
    let formData = new FormData();
    formData.append('file', file);
    return await lastValueFrom(
      this.client.post<never>(this.baseUrl + 'import', formData)
    );
  }

}
