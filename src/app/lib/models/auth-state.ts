import { User } from "./user.model";

export interface AuthState {
  token?: string;
  user?: User;
  expiresAt?: string;
  isFirstTime?: boolean;
}
