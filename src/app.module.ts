import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { WalletsModule } from './wallets/wallets.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'simple_bank',
      autoLoadEntities: true,
      // entities: [],
      synchronize: true,
    }),
    UsersModule,
    WalletsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
