import { Injectable, signal } from '@angular/core';
import { Role } from '../models/common/role';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  $token = signal<string | null>(null);
  $currentUser = signal<string | null>(null);
  $currentRole = signal<Role | null>(null);
}
