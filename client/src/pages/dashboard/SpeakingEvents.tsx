import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, TrendingUp, Calendar, Award } from "lucide-react";

// Mock leaderboard data
const mockLeaderboardData = [
  { rank: 1, name: "Dr. Emily Carter", events: 5, reward: "$100 Gift Card", hasReward: true },
  { rank: 2, name: "Marcus Johnson", events: 4, reward: null, hasReward: false },
  { rank: 3, name: "Sarah Chen", events: 3, reward: null, hasReward: false },
  { rank: 4, name: "James Wilson", events: 3, reward: null, hasReward: false },
  { rank: 5, name: "Dr. Patricia Lee", events: 2, reward: null, hasReward: false },
  { rank: 6, name: "Michael Brown", events: 2, reward: null, hasReward: false },
  { rank: 7, name: "Jennifer Davis", events: 2, reward: null, hasReward: false },
  { rank: 8, name: "Robert Taylor", events: 1, reward: null, hasReward: false },
  { rank: 9, name: "Lisa Anderson", events: 1, reward: null, hasReward: false },
  { rank: 10, name: "David Martinez", events: 1, reward: null, hasReward: false },
];

// Mock personal stats
const currentUserStats = {
  monthlyEngagements: 3,
  lifetimeTotal: 42,
  currentRank: 4,
};

export default function SpeakingEvents() {
  return (
    <div className="space-y-6">
      <div>
        <h2 style={{ margin: "0 0 8px" }}>Speaking Engagements</h2>
        <p style={{ color: "#64748B", margin: 0 }}>
          Track your speaking events and see how you rank among top speakers
        </p>
      </div>

      {/* Personal Stats Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card data-testid="card-monthly-engagements">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentUserStats.monthlyEngagements}</div>
            <p className="text-xs text-muted-foreground">
              Speaking engagements
            </p>
          </CardContent>
        </Card>

        <Card data-testid="card-lifetime-total">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lifetime Total</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentUserStats.lifetimeTotal}</div>
            <p className="text-xs text-muted-foreground">
              Total events completed
            </p>
          </CardContent>
        </Card>

        <Card data-testid="card-current-rank">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Rank</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">#{currentUserStats.currentRank}</div>
            <p className="text-xs text-muted-foreground">
              This month's ranking
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Leaderboard */}
      <Card data-testid="card-leaderboard">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-amber-500" />
            Top Speakers Leaderboard
          </CardTitle>
          <CardDescription>
            Top 10 speakers ranked by engagements this month. Top 3 earn rewards!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 pb-3 border-b font-medium text-sm text-muted-foreground">
              <div className="col-span-1">Rank</div>
              <div className="col-span-5">Name</div>
              <div className="col-span-3 text-center">Events This Month</div>
              <div className="col-span-3 text-right">Reward Status</div>
            </div>

            {/* Leaderboard Entries */}
            {mockLeaderboardData.map((entry) => (
              <div
                key={entry.rank}
                className={`grid grid-cols-12 gap-4 py-3 rounded-lg items-center ${
                  entry.rank === currentUserStats.currentRank 
                    ? 'bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-800' 
                    : entry.rank <= 3 
                    ? 'bg-amber-50 dark:bg-amber-950' 
                    : ''
                }`}
                data-testid={`leaderboard-entry-${entry.rank}`}
              >
                <div className="col-span-1 flex items-center justify-center">
                  {entry.rank <= 3 ? (
                    <Trophy 
                      className={`h-5 w-5 ${
                        entry.rank === 1 ? 'text-yellow-500' :
                        entry.rank === 2 ? 'text-gray-400' :
                        'text-amber-600'
                      }`}
                    />
                  ) : (
                    <span className="text-muted-foreground">#{entry.rank}</span>
                  )}
                </div>
                <div className="col-span-5 font-medium">
                  {entry.name}
                  {entry.rank === currentUserStats.currentRank && (
                    <Badge variant="outline" className="ml-2 text-xs">
                      You
                    </Badge>
                  )}
                </div>
                <div className="col-span-3 text-center font-semibold">
                  {entry.events}
                </div>
                <div className="col-span-3 text-right">
                  {entry.hasReward ? (
                    <Badge 
                      className="bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-100 border-amber-300 dark:border-amber-700"
                      data-testid={`reward-badge-${entry.rank}`}
                    >
                      <Award className="h-3 w-3 mr-1" />
                      {entry.reward}
                    </Badge>
                  ) : entry.rank <= 3 ? (
                    <span className="text-sm text-muted-foreground">Eligible for reward</span>
                  ) : (
                    <span className="text-sm text-muted-foreground">—</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Reward Info */}
          <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-950 rounded-lg border border-amber-200 dark:border-amber-800">
            <h4 className="font-medium text-amber-900 dark:text-amber-100 mb-2 flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              Monthly Rewards Program
            </h4>
            <p className="text-sm text-amber-800 dark:text-amber-200">
              Top 3 speakers each month receive rewards! Keep booking engagements to climb the leaderboard.
              Rewards are distributed at the beginning of each month based on the previous month's rankings.
            </p>
            {currentUserStats.currentRank <= 3 && (
              <Button 
                className="mt-3 w-full bg-amber-600 hover:bg-amber-700"
                data-testid="button-redeem-reward"
              >
                <Award className="h-4 w-4 mr-2" />
                Redeem Reward (Available at month end)
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
