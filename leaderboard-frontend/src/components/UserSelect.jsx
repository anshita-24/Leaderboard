function UserSelect({ users, setSelectedUser, fetchHistory }) {
  return (
    <div className="mb-4">
      <label className="block mb-2 font-semibold text-gray-700">Select User</label>
      <select onChange={(e) => {
        const user = users.find(u => u._id === e.target.value);
        setSelectedUser(user);
        fetchHistory(user._id);
      }} className="w-full p-2 rounded shadow border">
        <option value="">-- Choose --</option>
        {users.map(user => (
          <option key={user._id} value={user._id}>{user.name}</option>
        ))}
      </select>
    </div>
  );
}
export default UserSelect;
