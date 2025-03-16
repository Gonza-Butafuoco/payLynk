import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { SignupDto } from '../auth/dto/signup.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOneByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async createUser(signupDto: SignupDto): Promise<User> {
    const existingUser = await this.findOneByEmail(signupDto.email);
    if (existingUser) {
      throw new ConflictException('El email ya está registrado');
    }

    const hashedPassword = await bcrypt.hash(signupDto.password, 10);

    try {
      const newUser = this.usersRepository.create({
        email: signupDto.email,
        password: hashedPassword,
      });
      return await this.usersRepository.save(newUser);
    } catch (error) {
      throw new InternalServerErrorException('Error al crear el usuario');
    }
  }
}
