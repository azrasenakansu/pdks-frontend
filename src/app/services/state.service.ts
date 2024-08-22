import { Injectable, signal } from '@angular/core';
import { Role } from '../models/entities/role';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  $token = signal<string | null>(null);
  $tckn = signal<string | null>(null);
  $name = signal<string | null>(null);
  $role = signal<Role | null>(null);
}
