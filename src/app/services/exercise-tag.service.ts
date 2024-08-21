import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { lastValueFrom } from 'rxjs';
import { ExerciseTag } from '../models/entities/exercise-tag';

@Injectable({
  providedIn: 'root'
})
export class ExerciseTagService extends ApiService {

  async ListAll(){
    return await lastValueFrom(
      this.client.get<ExerciseTag[]>(this.baseUrl + 'ExerciseTag/ListAll')
    );
  }

  async Create(tag: ExerciseTag){
    return await lastValueFrom(
      this.client.post<never>(this.baseUrl + 'ExerciseTag/Create', tag)
    );
  }

  async Update(tag: ExerciseTag){
    return await lastValueFrom(
      this.client.post<never>(this.baseUrl + 'ExerciseTag/Update', tag)
    );
  }

  async Delete(id: string){
    return await lastValueFrom(
      this.client.delete<never>(this.baseUrl + `ExerciseTag/Delete/${id}`)
    );
  }
}
