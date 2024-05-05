import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseModule } from 'src/database/database.module';
import { AtStrategy, RtStrategy } from './strategies';

@Module({
    imports: [DatabaseModule],
    controllers: [AuthController],
    providers: [AuthService, AtStrategy, RtStrategy]
})
export class AuthModule {
    
}
