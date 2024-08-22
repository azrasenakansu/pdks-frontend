import { Role } from "./role";

export interface UserEntity {
  name: string;
  tckn: string;
  password: string;
  email: string;
  role: Role;
}
