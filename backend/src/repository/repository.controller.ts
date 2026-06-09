import { Controller, Get, Query } from '@nestjs/common';
import { RepositoryService } from './repository.service';

@Controller('repositories')
export class RepositoryController {
  constructor(
    private readonly repositoryService: RepositoryService,
  ) {}

  @Get('sync')
  async sync(@Query('githubId') githubId: string) {
    return this.repositoryService.syncRepositories(githubId);
  }

  @Get()
  async getRepositories() {
    return this.repositoryService.getAllRepositories();
  }
  @Get('dashboard')
  async dashboard() {
    return this.repositoryService.getDashboardStats();
  }
}