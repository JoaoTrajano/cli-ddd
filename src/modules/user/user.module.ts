import { Module } from '@nestjs/common';
import { UserUseCase } from './application/usecases/user.usecase.ts';
import { User } from './domain/entities/user';
import { RepositoryUser } from './infrastructure/adapters/user.repository.ts';

@Module({
  imports: [],
  controllers: [],
  providers: [UserUseCase, User, RepositoryUser],
})
export class UserModule {}