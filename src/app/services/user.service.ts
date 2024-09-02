import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { lastValueFrom } from 'rxjs';
import { UserEntity } from '../models/entities/user';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ApiService{

  async getAllUsers(){
    return await lastValueFrom(
      this.client.get<UserEntity[]>(this.baseUrl + 'user/all')
    );
  }
  
  async searchByTckn(tckn: string){
    return await lastValueFrom(
      this.client.get<UserEntity>(this.baseUrl + `user/search/${tckn}`)
    );
  }

  async createUser(user: UserEntity){
    return await lastValueFrom(
      this.client.post<never>(this.baseUrl + 'user/create',user)
    );
  }

  async createBulkUser(users: UserEntity[]){
    return await lastValueFrom(
      this.client.post<never>(this.baseUrl + 'user/createBulk', users)
    );
  }

  async deleteUser(tckn: string){
    return await lastValueFrom(
      this.client.delete<never>(this.baseUrl + `user/delete/${tckn}`)
    );
  }

  async updateUser(tckn: string, updatedUser: UserEntity){
    return await lastValueFrom(
      this.client.put<never>(this.baseUrl + `user/update/${tckn}`,updatedUser)
    );
  }

}
