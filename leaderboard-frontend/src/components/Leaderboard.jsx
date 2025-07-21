import { useEffect, useState } from "react";
import axios from "axios";

export default function Leaderboard() {
  const [users, setUsers] = useState([]);
  const [claiming, setClaiming] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await axios.get("/api/users");
    const sorted = res.data.sort((a, b) => b.points - a.points);
    setUsers(sorted);
  };

  const handleClaim = async (userId) => {
    setClaiming(true);
    try {
      await axios.post(`/api/claims/${userId}`);
      await fetchUsers();
    } catch (err) {
      console.error(err);
    }
    setClaiming(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-white py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-purple-700">🏆 Leaderboard</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
        {users.map((user, index) => (
          <div
            key={user._id}
            className="bg-white shadow-lg rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <div className="flex flex-col sm:flex-row items-center sm:gap-4 w-full">
              <span className="text-lg font-semibold text-gray-700 w-12 text-center">{index + 1}.</span>
              <span className="text-xl font-medium text-gray-900">{user.name}</span>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
              <span className="text-green-600 font-bold">{user.points} pts</span>
              <button
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl text-sm sm:text-base transition duration-200"
                onClick={() => handleClaim(user._id)}
                disabled={claiming}
              >
                Claim Points
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
