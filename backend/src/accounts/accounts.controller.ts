import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../users/entities/user.entity';
import { AccountResponseDto } from './dto/account-response.dto';

@Controller('accounts')
@UseGuards(JwtAuthGuard)
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  create(
    @GetUser() user: User,
    @Body() createAccountDto: CreateAccountDto,
  ): Promise<AccountResponseDto> {
    return this.accountsService.create(user, createAccountDto);
  }

  @Get()
  findAll(@GetUser() user: User): Promise<AccountResponseDto[]> {
    return this.accountsService.findAll(user.id);
  }

  @Get(':id')
  findOne(
    @GetUser() user: User,
    @Param('id') id: string,
  ): Promise<AccountResponseDto> {
    return this.accountsService.findOne(user.id, +id);
  }

  @Patch(':id')
  update(
    @GetUser() user: User,
    @Param('id') id: string,
    @Body() updateAccountDto: UpdateAccountDto,
  ): Promise<AccountResponseDto> {
    return this.accountsService.update(user.id, +id, updateAccountDto);
  }

  @Delete(':id')
  remove(@GetUser() user: User, @Param('id') id: string): Promise<void> {
    return this.accountsService.remove(user.id, +id);
  }
}
