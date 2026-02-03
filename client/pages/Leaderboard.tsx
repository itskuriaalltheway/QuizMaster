import { useState } from "react";
import { Trophy, Medal } from "lucide-react";
import Layout from "../components/Layout";

interface LeaderboardEntry {
  rank: number;
  name: string;
  score: number;
  total: number;
  percentage: number;
  topic: string;
  difficulty: string;
  date: string;
}

const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  {
    rank: 1,
    name: "Alex Chen",
    score: 10,
    total: 10,
    percentage: 100,
    topic: "Technology",
    difficulty: "Hard",
    date: "2025-02-03",
  },
  {
    rank: 2,
    name: "Sarah Johnson",
    score: 9,
    total: 10,
    percentage: 90,
    topic: "Science",
    difficulty: "Hard",
    date: "2025-02-02",
  },
  {
    rank: 3,
    name: "Marcus Williams",
    score: 9,
    total: 10,
    percentage: 90,
    topic: "History",
    difficulty: "Moderate",
    date: "2025-02-02",
  },
  {
    rank: 4,
    name: "Emma Davis",
    score: 8,
    total: 10,
    percentage: 80,
    topic: "Geography",
    difficulty: "Hard",
    date: "2025-02-01",
  },
  {
    rank: 5,
    name: "James Brown",
    score: 8,
    total: 10,
    percentage: 80,
    topic: "Literature",
    difficulty: "Moderate",
    date: "2025-02-01",
  },
  {
    rank: 6,
    name: "Olivia Martinez",
    score: 10,
    total: 10,
    percentage: 100,
    topic: "Sports",
    difficulty: "Easy",
    date: "2025-01-31",
  },
  {
    rank: 7,
    name: "David Taylor",
    score: 7,
    total: 10,
    percentage: 70,
    topic: "Science",
    difficulty: "Moderate",
    date: "2025-01-31",
  },
  {
    rank: 8,
    name: "Jessica Anderson",
    score: 9,
    total: 10,
    percentage: 90,
    topic: "Technology",
    difficulty: "Moderate",
    date: "2025-01-30",
  },
  {
    rank: 9,
    name: "Robert Wilson",
    score: 7,
    total: 10,
    percentage: 70,
    topic: "History",
    difficulty: "Hard",
    date: "2025-01-30",
  },
  {
    rank: 10,
    name: "Lucy Moore",
    score: 8,
    total: 10,
    percentage: 80,
    topic: "Geography",
    difficulty: "Moderate",
    date: "2025-01-29",
  },
];

type FilterType = "all" | "topic" | "difficulty";

export default function Leaderboard() {
  const [filterType, setFilterType] = useState<FilterType>("all");
  const [selectedFilter, setSelectedFilter] = useState<string>("");

  const topics = [...new Set(MOCK_LEADERBOARD.map((entry) => entry.topic))];
  const difficulties = [...new Set(MOCK_LEADERBOARD.map((entry) => entry.difficulty))];

  let filteredLeaderboard = MOCK_LEADERBOARD;

  if (filterType === "topic" && selectedFilter) {
    filteredLeaderboard = MOCK_LEADERBOARD.filter(
      (entry) => entry.topic === selectedFilter
    );
  } else if (filterType === "difficulty" && selectedFilter) {
    filteredLeaderboard = MOCK_LEADERBOARD.filter(
      (entry) => entry.difficulty === selectedFilter
    );
  }

  const getMedalIcon = (rank: number) => {
    if (rank === 1) return <span className="text-2xl">🥇</span>;
    if (rank === 2) return <span className="text-2xl">🥈</span>;
    if (rank === 3) return <span className="text-2xl">🥉</span>;
    return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>;
  };

  return (
    <Layout>
      <div className="bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 py-12 min-h-[70vh]">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="max-w-5xl mx-auto mb-12">
            <div className="flex items-center gap-4 mb-8">
              <Trophy className="w-10 h-10 text-secondary" />
              <div>
                <h1 className="text-4xl font-bold text-foreground">Global Leaderboard</h1>
                <p className="text-muted-foreground">
                  See how you rank against other quiz enthusiasts worldwide
                </p>
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="bg-card rounded-lg p-6 border border-border">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* All Scores */}
                <div>
                  <label className="text-sm font-semibold text-foreground mb-3 block">
                    View All Scores
                  </label>
                  <button
                    onClick={() => {
                      setFilterType("all");
                      setSelectedFilter("");
                    }}
                    className={`w-full py-2 px-4 rounded-lg transition font-medium ${
                      filterType === "all"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground hover:bg-border"
                    }`}
                  >
                    All Scores
                  </button>
                </div>

                {/* Filter by Topic */}
                <div>
                  <label className="text-sm font-semibold text-foreground mb-3 block">
                    Filter by Topic
                  </label>
                  <select
                    value={filterType === "topic" ? selectedFilter : ""}
                    onChange={(e) => {
                      setFilterType("topic");
                      setSelectedFilter(e.target.value);
                    }}
                    className="w-full py-2 px-4 rounded-lg border border-border bg-card text-foreground cursor-pointer"
                  >
                    <option value="">Select Topic</option>
                    {topics.map((topic) => (
                      <option key={topic} value={topic}>
                        {topic}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Filter by Difficulty */}
                <div>
                  <label className="text-sm font-semibold text-foreground mb-3 block">
                    Filter by Difficulty
                  </label>
                  <select
                    value={filterType === "difficulty" ? selectedFilter : ""}
                    onChange={(e) => {
                      setFilterType("difficulty");
                      setSelectedFilter(e.target.value);
                    }}
                    className="w-full py-2 px-4 rounded-lg border border-border bg-card text-foreground cursor-pointer"
                  >
                    <option value="">Select Difficulty</option>
                    {difficulties.map((difficulty) => (
                      <option key={difficulty} value={difficulty}>
                        {difficulty}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Leaderboard Table */}
          <div className="max-w-5xl mx-auto">
            <div className="bg-card rounded-lg border border-border overflow-hidden shadow-md">
              {/* Desktop View */}
              <div className="hidden md:block">
                <div className="grid grid-cols-12 gap-4 p-6 bg-primary text-primary-foreground font-semibold text-sm">
                  <div className="col-span-1">Rank</div>
                  <div className="col-span-3">Name</div>
                  <div className="col-span-2">Topic</div>
                  <div className="col-span-2">Difficulty</div>
                  <div className="col-span-2">Score</div>
                  <div className="col-span-2">Date</div>
                </div>

                {filteredLeaderboard.length > 0 ? (
                  <div className="divide-y divide-border">
                    {filteredLeaderboard.map((entry, idx) => (
                      <div
                        key={idx}
                        className={`grid grid-cols-12 gap-4 p-6 items-center text-sm hover:bg-muted/50 transition ${
                          entry.rank <= 3 ? "bg-yellow-50 dark:bg-yellow-950/10" : ""
                        }`}
                      >
                        <div className="col-span-1 flex justify-center">
                          {getMedalIcon(entry.rank)}
                        </div>
                        <div className="col-span-3 font-semibold text-foreground">
                          {entry.name}
                        </div>
                        <div className="col-span-2 text-muted-foreground">
                          {entry.topic}
                        </div>
                        <div className="col-span-2">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              entry.difficulty === "Easy"
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                : entry.difficulty === "Moderate"
                                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                            }`}
                          >
                            {entry.difficulty}
                          </span>
                        </div>
                        <div className="col-span-2">
                          <div className="font-bold text-primary">
                            {entry.percentage}%
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {entry.score}/{entry.total}
                          </div>
                        </div>
                        <div className="col-span-2 text-muted-foreground">
                          {new Date(entry.date).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-12 text-center text-muted-foreground">
                    No entries found for the selected filter.
                  </div>
                )}
              </div>

              {/* Mobile View */}
              <div className="md:hidden divide-y divide-border">
                {filteredLeaderboard.length > 0 ? (
                  filteredLeaderboard.map((entry, idx) => (
                    <div
                      key={idx}
                      className={`p-4 hover:bg-muted/50 transition ${
                        entry.rank <= 3 ? "bg-yellow-50 dark:bg-yellow-950/10" : ""
                      }`}
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <div className="flex items-center gap-2 font-bold">
                          {getMedalIcon(entry.rank)}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-foreground">{entry.name}</p>
                          <p className="text-xs text-muted-foreground">{entry.topic}</p>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-primary text-lg">
                            {entry.percentage}%
                          </div>
                          <span
                            className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                              entry.difficulty === "Easy"
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                : entry.difficulty === "Moderate"
                                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                            }`}
                          >
                            {entry.difficulty}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground text-right">
                        {new Date(entry.date).toLocaleDateString()}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-muted-foreground">
                    No entries found for the selected filter.
                  </div>
                )}
              </div>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <div className="bg-card rounded-lg p-6 border border-border text-center">
                <div className="text-3xl font-bold text-primary mb-2">
                  {filteredLeaderboard.length}
                </div>
                <div className="text-sm text-muted-foreground">
                  Total Entries
                </div>
              </div>
              <div className="bg-card rounded-lg p-6 border border-border text-center">
                <div className="text-3xl font-bold text-secondary mb-2">
                  {(
                    filteredLeaderboard.reduce((acc, e) => acc + e.percentage, 0) /
                    filteredLeaderboard.length
                  ).toFixed(1)}
                  %
                </div>
                <div className="text-sm text-muted-foreground">
                  Average Score
                </div>
              </div>
              <div className="bg-card rounded-lg p-6 border border-border text-center">
                <div className="text-3xl font-bold text-accent mb-2">
                  {Math.max(...filteredLeaderboard.map((e) => e.percentage))}%
                </div>
                <div className="text-sm text-muted-foreground">
                  Highest Score
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
