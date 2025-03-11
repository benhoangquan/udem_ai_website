import { Hero } from "@/components/Hero";

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen ">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">Club Leaderboard</h1>

        {/* Top Contributors */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Top Contributors</h2>
          <div className=" rounded-lg shadow-md overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
              {/* Second Place */}
              <div className="order-2 md:order-1">
                <div className="text-center">
                  <div className="w-24 h-24  rounded-full mx-auto mb-4"></div>
                  <div className="text-2xl font-bold text-gray-600 mb-1">2nd Place</div>
                  <div className="font-semibold">Sarah Chen</div>
                  <div className="text-gray-600">950 points</div>
                </div>
              </div>
              {/* First Place */}
              <div className="order-1 md:order-2">
                <div className="text-center">
                  <div className="w-32 h-32  rounded-full mx-auto mb-4 border-4 border-yellow-400"></div>
                  <div className="text-3xl font-bold text-yellow-500 mb-1">1st Place</div>
                  <div className="font-semibold">Alex Kim</div>
                  <div className="text-gray-600">1250 points</div>
                </div>
              </div>
              {/* Third Place */}
              <div className="order-3">
                <div className="text-center">
                  <div className="w-24 h-24  rounded-full mx-auto mb-4"></div>
                  <div className="text-2xl font-bold text-gray-600 mb-1">3rd Place</div>
                  <div className="font-semibold">David Park</div>
                  <div className="text-gray-600">820 points</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Full Rankings</h2>
          <div className=" rounded-lg shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Points</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Achievements</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[4, 5, 6, 7, 8].map((rank) => (
                  <tr key={rank} className="hover:">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{rank}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">Member {rank}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{1000 - (rank * 50)} points</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      <div className="flex gap-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">Workshop Host</span>
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">Project Lead</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* How to Earn Points */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">How to Earn Points</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className=" rounded-lg shadow-md p-6">
              <h3 className="font-semibold mb-3">Participation</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Attend Workshop: 10 points</li>
                <li>• Submit Project: 50 points</li>
                <li>• Host Event: 100 points</li>
              </ul>
            </div>
            <div className=" rounded-lg shadow-md p-6">
              <h3 className="font-semibold mb-3">Contributions</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Code Review: 20 points</li>
                <li>• Documentation: 30 points</li>
                <li>• Feature Implementation: 40 points</li>
              </ul>
            </div>
            <div className=" rounded-lg shadow-md p-6">
              <h3 className="font-semibold mb-3">Leadership</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Lead Project: 150 points</li>
                <li>• Mentor Others: 100 points</li>
                <li>• Organize Event: 120 points</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 