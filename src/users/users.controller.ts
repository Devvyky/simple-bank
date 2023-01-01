import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserDTO } from './dtos/index.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/')
  async createUser(
    @Req() req: Request,
    @Res() res: Response,
    @Body() payload: CreateUserDTO,
  ) {
    try {
      const data = await this.usersService.create(payload);
      res.status(201).json({
        message: 'User signup successfull',
        data,
      });
    } catch (error) {
      res.status(error.status || 500).json({
        message: error.message,
        error,
      });
    }
  }
}
