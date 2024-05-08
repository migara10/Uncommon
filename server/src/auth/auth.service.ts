import { Injectable, ConflictException, ForbiddenException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-auth.dto';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';
import { Tokens } from 'src/types/types';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly dataBaseService: DatabaseService,
    private jwtService: JwtService,
  ) {}

  async saveUser(createUserDto: CreateUserDto): Promise<Tokens> {
    createUserDto.password = await this.hashData(createUserDto.password);
    try {
      const createdUser = await this.dataBaseService.user.create({
        data: createUserDto,
      });

      // Assuming you have a method to generate tokens for the created user
      // const tokens: Tokens = generateTokens(createdUser);
      const tokens: Tokens = await this.getTokens(createdUser.id, createdUser.email)
      await this.updateRtHash(createdUser.id, tokens.refresh_token)

      return tokens;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        // Duplicate email error
        throw new ConflictException('Email address is already in use');
      } else {
        // Rethrow other errors
        throw error;
      }
    }
  }

  async loginUser(loginUserDto: LoginUserDto): Promise<{user:any; tokens:Tokens}> {
    const user = await this.dataBaseService.user.findUnique({
      where: {
        email: loginUserDto.email
      }        
    })
    if(!user) throw new ForbiddenException('User not found')

      const passwordMatch = await bcrypt.compare(loginUserDto.password, user.password);
      if(!passwordMatch) throw new ForbiddenException('Password Not Match!');

      const tokens: Tokens = await this.getTokens(user.id, user.email)
      await this.updateRtHash(user.id, tokens.refresh_token)

    return {
      user,
      tokens
    }
  }

  hashData(data: string) {
    return bcrypt.hash(data, 10);
  }

  async getTokens(userId: string, email: string): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        { secret: process.env.AT_SECRET, expiresIn: 60 * 15 },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        { secret: process.env.RT_SECRET, expiresIn: 60 * 60 * 24  },
      ),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    }
  }

  async updateRtHash(userId: string, rt:string){
    await this.dataBaseService.user.update({
      where: {
        id:userId
      },
      data: {
        refreshToken: rt
      }
    })
  }



}
