import { Module } from '@nestjs/common';
import { AuthUseCase } from './application/usecases/auth.usecase.ts';
import { Auth } from './domain/entities/auth';
import { RepositoryAuth } from './infrastructure/adapters/auth.repository.ts';

@Module({
  imports: [],
  controllers: [],
  providers: [AuthUseCase, Auth, RepositoryAuth],
})
export class AuthModule {}