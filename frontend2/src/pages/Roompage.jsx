import React from 'react';
import { useParams } from 'react-router-dom';

const RoomPage = () => {
  const { roomId } = useParams();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4">Room ID: {roomId}</h2>
      <div className="flex space-x-4">
        <video className="w-64 h-48 bg-gray-800 rounded" autoPlay muted></video>
        <video className="w-64 h-48 bg-gray-800 rounded" autoPlay></video>
      </div>
      <div className="mt-6 space-x-4">
        <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded">Leave</button>
        <button className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded">Toggle Mic</button>
        <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">Toggle Camera</button>
      </div>
    </div>
  );
};

export default RoomPage;
