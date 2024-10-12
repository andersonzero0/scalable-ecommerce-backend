import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserInputDTO } from './dto/user.input.dto';
import { User } from './entity/user.entity';

@UseInterceptors(ClassSerializerInterceptor)
@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async create(@Body() data: CreateUserInputDTO): Promise<User> {
    try {
      const { first_name, last_name, email, password } = data;

      return await this.userService.create({
        first_name,
        last_name,
        email,
        password,
      });
    } catch (error) {
      throw error;
    }
  }

  @Get()
  async findAll(): Promise<User[]> {
    try {
      return await this.userService.findAll();
    } catch (error) {
      throw error;
    }
  }

  @Get('details/:id')
  async findOne(@Param('id') id: string): Promise<User> {
    try {
      return await this.userService.findOne(id);
    } catch (error) {
      throw error;
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: CreateUserInputDTO,
  ): Promise<User> {
    try {
      return await this.userService.update(id, data);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.userService.remove(id);
    } catch (error) {
      throw error;
    }
  }
}
