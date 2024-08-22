import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { lastValueFrom } from 'rxjs';
import { AuthResponse } from '../models/entities/auth-response';
import { LocalStorageService } from './local-storage.service';
import { StateService } from './state.service';
import { jwtDecode } from "jwt-decode";
import { Role } from '../models/common/role';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends ApiService {
  private state: StateService = inject(StateService);
  private storage: LocalStorageService = inject(LocalStorageService);

  isAuthenticated() : boolean{
    return this.state.$token() !== null;
  }

  logout(){
    this.state.$token.set(null);
    this.storage.clear();
    this.state.$tckn.set(null);
    this.state.$name.set(null);
    this.state.$role.set(null);
  }

  async loadState(){
    if(this.state.$token() === null){
      return;
    }
    const decoded = jwtDecode(this.state.$token()!)
    if(decoded.sub !== undefined && decoded.sub !== null){
      this.state.$tckn.set(decoded.sub);
    }
    this.state.$name.set(this.storage.getItem("name"));
    this.state.$role.set(this.storage.getItem("role") === "ADMIN" ? Role.ADMIN : Role.USER);
  }

  async login(username: string, password: string): Promise<boolean> {
    const authResponse = await lastValueFrom(
      this.client.post<AuthResponse>(this.baseUrl + 'auth/login', {
        username: username,
        password: password,
      }),
    );

    if (!authResponse.authenticated) {
      return false;
    }

    this.state.$token.set(authResponse.token);
    this.state.$tckn.set(authResponse.tckn);
    this.state.$name.set(authResponse.fullName);
    this.state.$role.set(authResponse.role.authority === "ADMIN" ? Role.ADMIN : Role.USER);
    this.storage.setItem('token', authResponse.token);
    this.storage.setItem('tckn', authResponse.tckn);
    this.storage.setItem('name', authResponse.fullName);
    this.storage.setItem('role', authResponse.role.authority);
    return true;
  }
}
