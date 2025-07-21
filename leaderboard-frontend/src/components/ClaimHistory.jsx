function ClaimHistory({ history }) {
  return (
    <div className="max-w-2xl mx-auto mt-8 bg-white rounded p-4 shadow">
      <h3 className="text-lg font-semibold mb-2 text-purple-600">🧾 Claim History</h3>
      <ul className="space-y-1 text-sm">
        {history.map(claim => (
          <li key={claim._id}>
            +{claim.points} points on {new Date(claim.claimedAt).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default ClaimHistory;
