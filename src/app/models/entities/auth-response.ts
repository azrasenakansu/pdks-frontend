import { Role } from "../common/role";

export interface AuthResponse {
    authenticated: boolean;
    tckn: string;
    token: string;
    fullName: string;
    role: any;
}