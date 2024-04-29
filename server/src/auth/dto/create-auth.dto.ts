import { IsEmail, IsEnum, IsString, Length } from 'class-validator';

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export class CreateAuthDto {
  @IsString()
  @Length(2, 30)
  firstName: string;

  @IsString()
  @Length(2, 30)
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(2, 8)
  password: string;

  @IsEnum(Role)
  userType: Role;
}
