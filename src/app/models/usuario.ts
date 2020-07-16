export class Usuario {
  id: number;
  username: string;
  password: string;
  display_name: string;
  email: string;
  permissions: string[] = [];
  user_enabled: boolean;
  role: string;
  role_enabled: boolean;
}
