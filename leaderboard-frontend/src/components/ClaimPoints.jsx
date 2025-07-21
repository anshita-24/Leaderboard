import axios from 'axios';

function ClaimPoints({ user, fetchHistory }) {
  const claim = () => {
    axios.post('http://localhost:5000/api/claims', { userId: user._id })
      .then(() => {
        fetchHistory(user._id);
        window.location.reload();
      });
  };

  return (
    <button onClick={claim} className="mt-4 w-full bg-purple-600 text-white py-2 px-4 rounded shadow hover:bg-purple-700">
      Claim Random Points
    </button>
  );
}
export default ClaimPoints;
