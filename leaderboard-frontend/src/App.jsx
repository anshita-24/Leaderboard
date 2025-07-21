import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import UserSelect from './components/UserSelect';
import ClaimPoints from './components/ClaimPoints';
import Leaderboard from './components/Leaderboard';
import ClaimHistory from './components/ClaimHistory';

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/users');
      const sorted = res.data.sort((a, b) => b.totalPoints - a.totalPoints);
      setUsers(sorted);
    } catch (err) {
      console.error('Failed to fetch users:', err);
    }
  };

  const fetchHistory = async (userId) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/claims/${userId}`);
      setHistory(res.data);
    } catch (err) {
      console.error('Failed to fetch history:', err);
    }
  };

  return (
    <div className="app">
      <h1 className="title">🏆 Leaderboard System</h1>

      <div className="main-container">
        <div className="card left-panel">
          <UserSelect users={users} setSelectedUser={setSelectedUser} fetchHistory={fetchHistory} />
          {selectedUser && (
            <div style={{ marginTop: '20px' }}>
              <ClaimPoints user={selectedUser} fetchHistory={fetchHistory} />
            </div>
          )}
        </div>

        <div className="card right-panel">
          <Leaderboard users={users} />
        </div>
      </div>

      {selectedUser && (
        <div className="card history-panel">
          <ClaimHistory history={history} />
        </div>
      )}

      {/* Inline App CSS */}
      <style>{`
        .main-container {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          justify-content: center;
          padding: 20px;
        }

        .card {
          background: #fdfbff;
          padding: 20px;
          border-radius: 16px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.08);
          width: 100%;
          max-width: 400px;
        }

        .right-panel {
          flex: 1;
          max-width: 500px;
        }

        .history-panel {
          margin: 30px auto;
          max-width: 600px;
        }

        .title {
          text-align: center;
          font-size: 2rem;
          margin-top: 30px;
          color: #5c2d91;
        }
      `}</style>
    </div>
  );
}

export default App;
