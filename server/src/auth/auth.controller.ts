import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-auth.dto';
import { Tokens } from 'src/types/types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('sign-up') // sign up user
  saveUser(@Body(ValidationPipe) createAuthDto:CreateUserDto): Promise<Tokens> {
    return this.authService.saveUser(createAuthDto);
  }
}



/* import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-auth.dto';
import { Tokens } from 'src/types/types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up') // sign up user
  async saveUser(@Body(ValidationPipe) createAuthDto: CreateUserDto): Promise<Tokens> {
    return this.authService.saveUser(createAuthDto);
  }
} */

