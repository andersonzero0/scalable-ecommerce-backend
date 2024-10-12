import { Module } from '@nestjs/common';
import { DatabaseModule } from './modules/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../.env',
    }),
    DatabaseModule,
    UserModule,
  ],
})
export class AppModule {}
