import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from './entities/wallets.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Wallet])],
})
export class WalletsModule {}
