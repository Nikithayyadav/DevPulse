import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RepositoryService {
  constructor(private prisma: PrismaService) {}

  async syncRepositories(githubId: string) {
    const user = await this.prisma.user.findUnique({
      where: { githubId },
    });

    if (!user?.accessToken) {
      throw new Error('Access token not found');
    }

    const response = await axios.get(
      'https://api.github.com/user/repos',
      {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      },
    );

    const repos = response.data;

    for (const repo of repos) {
      await this.prisma.repository.upsert({
        where: {
          githubRepoId: repo.id.toString(),
        },
        update: {
          name: repo.name,
          owner: repo.owner.login,
          repoUrl: repo.html_url,
          description: repo.description,
          language: repo.language,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
        },
        create: {
          githubRepoId: repo.id.toString(),
          name: repo.name,
          owner: repo.owner.login,
          repoUrl: repo.html_url,
          description: repo.description,
          language: repo.language,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          userId: user.id,
        },
      });
    }

    return {
      synced: repos.length,
    };
  }

  async getAllRepositories() {
    return this.prisma.repository.findMany({
      include: {
        user: true,
        metrics: true,
      },
    });
  }

  async getDashboardStats() {
    const repositories = await this.prisma.repository.findMany();

    const totalRepos = repositories.length;

    const totalStars = repositories.reduce(
      (sum, repo) => sum + repo.stars,
      0,
    );

    const totalForks = repositories.reduce(
      (sum, repo) => sum + repo.forks,
      0,
    );

    const languages = repositories
      .map((repo) => repo.language)
      .filter(Boolean);

    const languageCount: Record<string, number> = {};

    for (const language of languages) {
      languageCount[language!] =
        (languageCount[language!] || 0) + 1;
    }

    const topLanguage =
      Object.entries(languageCount).sort(
        (a, b) => b[1] - a[1],
      )[0]?.[0] || 'Unknown';

    return {
      totalRepos,
      totalStars,
      totalForks,
      topLanguage,
    };
  }
}