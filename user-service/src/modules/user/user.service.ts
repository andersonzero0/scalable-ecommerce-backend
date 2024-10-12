import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserInputDTO, UpdateUserInputDTO } from './dto/user.input.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @Inject(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(data: CreateUserInputDTO): Promise<User> {
    if (await this.userRepository.findOne({ where: { email: data.email } })) {
      throw new ForbiddenException('Email already exists');
    }

    const salt = await bcrypt.genSalt(10);

    const hash = await bcrypt.hash(data.password, salt);

    const user = await this.userRepository.save({ ...data, password: hash });
    return user;
  }

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find();

    return users;
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(id: string, data: UpdateUserInputDTO): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      select: { id: true },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.userRepository.update(id, data);

    const updatedUser = await this.findOne(id);

    return updatedUser;
  }

  async remove(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const deleteUser = await this.userRepository.delete(id);

    if (deleteUser.affected > 0) {
      return 'User deleted successfully';
    }
  }
}
