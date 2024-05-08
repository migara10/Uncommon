import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-auth.dto';
import { Tokens } from 'src/types/types';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('sign-up') // sign up user
  saveUser(@Body(ValidationPipe) createUserDto:CreateUserDto): Promise<Tokens> {
    return this.authService.saveUser(createUserDto);
  }


  @Post('sign-in') // sign-up user
  loginUser(@Body(ValidationPipe) loginUserDto:LoginUserDto): Promise<{user:any; tokens:Tokens}>{
    return this.authService.loginUser(loginUserDto)
  }
}



