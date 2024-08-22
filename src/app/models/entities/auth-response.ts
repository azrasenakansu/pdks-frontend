import { Role } from "./role";

export interface AuthResponse {
    authenticated: boolean;
    tckn: string;
    token: string;
    fullName: string;
    role: Role;
}