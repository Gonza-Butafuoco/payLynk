import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let authService: AuthService;
  const mockUserService = {
    findOneByEmail: jest.fn(),
    createUser: jest.fn(),
  };
  const mockJwtService = { sign: jest.fn(() => 'test-token') };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUserService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('Debería registrar un usuario', async () => {
    mockUserService.createUser.mockResolvedValue({
      id: 1,
      email: 'test@example.com',
    });

    const result = await authService.signup({
      email: 'test@example.com',
      password: 'password123',
    });

    expect(result.id).toBe(1);
    expect(result.email).toBe('test@example.com');
  });

  it('Debería hacer login correctamente', async () => {
    mockUserService.findOneByEmail.mockResolvedValue({
      id: 1,
      email: 'test@example.com',
      password: await bcrypt.hash('password123', 10),
    });

    const result = await authService.login({
      email: 'test@example.com',
      password: 'password123',
    });

    expect(result.access_token).toBe('test-token');
  });

  it('Debería fallar login con contraseña incorrecta', async () => {
    mockUserService.findOneByEmail.mockResolvedValue({
      id: 1,
      email: 'test@example.com',
      password: await bcrypt.hash('password123', 10),
    });

    await expect(
      authService.login({
        email: 'test@example.com',
        password: 'wrongpassword',
      }),
    ).rejects.toThrow(UnauthorizedException);
  });
});
