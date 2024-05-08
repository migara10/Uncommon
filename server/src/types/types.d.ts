export class Tokens {
  access_token: string;
  refresh_token: string;
}

export type JwtPayload = {
    sub: 'string';
    email: string;
    roles: Role[];
  };
