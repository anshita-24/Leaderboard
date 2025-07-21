import { useEffect, useState } from 'react';
import axios from 'axios';
import UserSelect from './components/UserSelect';
import ClaimPoints from './components/ClaimPoints';
import Leaderboard from './components/Leaderboard';
import ClaimHistory from './components/ClaimHistory';

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/users')
      .then(res => setUsers(res.data));
  }, []);

  const fetchHistory = (userId) => {
    axios.get(`http://localhost:5000/api/claims/${userId}`)
      .then(res => setHistory(res.data));
  };

  return (
    <div className="min-h-screen px-4 py-10 bg-gradient-to-br from-indigo-100 to-purple-200 font-sans flex flex-col items-center">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-10 text-purple-900 tracking-wide flex items-center gap-3">
        <span role="img" aria-label="trophy">🏆</span> Leaderboard System
      </h1>

      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: User Select & Claim */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl w-full">
          <UserSelect users={users} setSelectedUser={setSelectedUser} fetchHistory={fetchHistory} />
          {selectedUser && (
            <div className="mt-6">
              <ClaimPoints user={selectedUser} fetchHistory={fetchHistory} />
            </div>
          )}
        </div>

        {/* Right: Leaderboard */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl w-full">
          <Leaderboard users={users} />
        </div>
      </div>

      {/* Claim History */}
      {selectedUser && (
        <div className="w-full max-w-4xl mt-10 bg-white p-6 sm:p-8 rounded-2xl shadow-xl">
          <ClaimHistory history={history} />
        </div>
      )}
    </div>
  );
}

export default App;
