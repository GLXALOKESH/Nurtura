import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [roomId, setRoomId] = useState('');
  const navigate = useNavigate();

  const handleJoin = () => {
    if (roomId.trim()) navigate(`/room/${roomId}`);
  };

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * Asynchronously requests a new room ID from the backend and navigates
 * to the newly created room using the received room ID.
 */

/*******  a8bb8ce5-d402-4972-b33e-59e4a01c084f  *******/  const handleCreate = async () => {
    const res = await fetch('http://localhost:3000/api/v1/newRoomId');
    const data = await res.json();
    navigate(`/room/${data.roomId}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-6">🔗 Start or Join a Call</h1>
      <div className="space-y-4">
        <input
          type="text"
          className="px-4 py-2 rounded bg-gray-800 border border-gray-700"
          placeholder="Enter Room ID"
          value={roomId}
          onChange={e => setRoomId(e.target.value)}
        />
        <div className="flex space-x-4 justify-center">
          <button onClick={handleJoin} className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded">Join</button>
          <button onClick={handleCreate} className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded">Create New Room</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;