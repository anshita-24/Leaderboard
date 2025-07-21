import React from 'react';

const medalEmoji = ['🥇', '🥈', '🥉'];

const Leaderboard = ({ users }) => {
  return (
    <div className="leaderboard">
      <h2>🏆 Leaderboard</h2>
      <ul className="leaderboard-list">
        {users.map((user, index) => (
          <li className="leaderboard-item" key={user._id}>
            <span className="rank">{medalEmoji[index] || `${index + 1}️⃣`}</span>
            <span className="name">{user.name}</span>
            <span className="points">{user.totalPoints ?? 0} pts</span>
          </li>
        ))}
      </ul>

      {/* Inline CSS styles */}
      <style>{`
        .leaderboard {
          text-align: center;
          padding: 20px;
          background: #faf0f8;
          min-height: 100vh;
        }

        .leaderboard h2 {
          font-size: 2rem;
          margin-bottom: 25px;
          color: #7b2cbf;
        }

        .leaderboard-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .leaderboard-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #fff;
          padding: 14px 22px;
          margin: 12px auto;
          border-radius: 16px;
          width: 90%;
          max-width: 500px;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
          font-size: 1.1rem;
          font-weight: 500;
          transition: transform 0.2s ease;
        }

        .leaderboard-item:hover {
          transform: scale(1.02);
        }

        .rank {
          font-size: 1.5rem;
        }

        .name {
          flex: 1;
          margin-left: 18px;
          text-align: left;
          color: #333;
        }

        .points {
          color: #9d4edd;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default Leaderboard;
