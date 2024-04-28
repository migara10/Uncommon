export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userType: Role;
}

export interface SignIn extends User {
  confirmPassword: string,
}
