import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { lastValueFrom } from 'rxjs';
import { Role } from '../models/entities/role';

@Injectable({
  providedIn: 'root',
})
export class RoleService extends ApiService {
  async getRoles() {
    return await lastValueFrom(this.client.get<Role[]>(this.baseUrl + 'roles'));
  }
}
