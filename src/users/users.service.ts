import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';

import { UtilService } from 'src/utils/util.service';
import { Wallet } from 'src/wallets/entities/wallets.entity';
import { CreateUserDTO } from './dtos/index.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>,
    private readonly connection: Connection,
    private readonly utilService: UtilService,
  ) {}
  async create(payload: CreateUserDTO): Promise<User> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const existing_user = await this.userRepository.findOne({
        where: [
          {
            username: payload.username,
            is_Deleted: false,
          },
          {
            email: payload.email,
            is_Deleted: false,
          },
        ],
      });

      if (existing_user) {
        throw new BadRequestException(
          'An account already exist with that username or email',
        );
      }

      const user = this.userRepository.create(payload);

      const wallet = this.walletRepository.create({
        account_name: user.full_name,
        account_number: this.utilService.genereteAccountNumber(),
        bank_code: '058',
        bank_name: 'Zenith Bank',
      });

      user.wallet = wallet;
      await this.walletRepository.save(wallet);
      await this.userRepository.save(user);

      await queryRunner.commitTransaction();
      return user;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
