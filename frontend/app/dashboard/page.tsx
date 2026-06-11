"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface DashboardStats {
  totalRepos: number;
  totalStars: number;
  totalForks: number; 
  topLanguage: string;
}

interface Repository {
  id: string;
  name: string;
  language: string;
  stars: number;
  forks: number;
}

export default function DashboardPage() {
  const [stats, setStats] =
    useState<DashboardStats | null>(null);

  const [repositories, setRepositories] =
    useState<Repository[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const dashboardRes = await axios.get(
      "http://localhost:3001/repositories/dashboard"
    );

    const reposRes = await axios.get(
      "http://localhost:3001/repositories"
    );

    setStats(dashboardRes.data);
    setRepositories(reposRes.data); 
  };

  if (!stats) {
    return <div className="p-10">Loading...</div>;
  }

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-8">
        DevPulse Dashboard
      </h1>

      <div className="grid grid-cols-4 gap-4 mb-10">
        <div className="border rounded-xl p-4">
          <h3>Total Repos</h3>
          <p className="text-3xl font-bold">
            {stats.totalRepos}
          </p>
        </div>

        <div className="border rounded-xl p-4">
          <h3>Stars</h3>
          <p className="text-3xl font-bold">
            {stats.totalStars}
          </p>
        </div>

        <div className="border rounded-xl p-4">
          <h3>Forks</h3>
          <p className="text-3xl font-bold">
            {stats.totalForks}
          </p>
        </div>

        <div className="border rounded-xl p-4">
          <h3>Top Language</h3>
          <p className="text-3xl font-bold">
            {stats.topLanguage}
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-4">
        Repositories
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        {repositories.map((repo) => (
          <div
            key={repo.id}
            className="border rounded-xl p-4"
          >
            <h3 className="font-bold text-lg">
              {repo.name}
            </h3>

            <p>{repo.language}</p>

            <div className="flex gap-4 mt-2">
              <span>⭐ {repo.stars}</span>
              <span>🍴 {repo.forks}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
