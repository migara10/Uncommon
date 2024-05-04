import { Injectable, ConflictException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-auth.dto';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';
import { Tokens } from 'src/types/types';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
  constructor(private readonly dataBaseService: DatabaseService) {}

  hashData(data: string) {
    return bcrypt.hash(data, 10)
  }

  async saveUser(createAuthDto: CreateUserDto): Promise<Tokens> {
    createAuthDto.password = await this.hashData(createAuthDto.password);
    try {  
      const createdUser = await this.dataBaseService.user.create({
        data: createAuthDto,
      });

      // Assuming you have a method to generate tokens for the created user
      // const tokens: Tokens = generateTokens(createdUser);
      const tokens: Tokens = {access_token: '', refresh_token: ''};
      
      return tokens;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        // Duplicate email error
        throw new ConflictException('Email address is already in use');
      } else {
        // Rethrow other errors
        throw error;
      }
    }
  }
}
