import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { v4 as uuidv4 } from "uuid";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const [roomId, setRoomId] = useState("");
  const [myId, setMyId] = useState("");
  const [inputRoomId, setInputRoomId] = useState("");
  const socketRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    socketRef.current = io("http://localhost:3000");

    socketRef.current.on("connect", () => {
      console.log("🟢 Connected:", socketRef.current.id);
      setMyId(socketRef.current.id);
    });

    socketRef.current.on("message", (msg) => {
      setMessages((prev) => [...prev, { text: msg, self: false }]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!newMsg.trim()) return;
    socketRef.current.emit("message", newMsg);
    setMessages((prev) => [...prev, { text: newMsg, self: true }]);
    setNewMsg("");
  };

  const joinRoom = () => {
    if (!inputRoomId.trim()) return;
    setRoomId(inputRoomId);
    socketRef.current.emit("join", inputRoomId);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-100 to-gray-300 px-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 text-black p-4 text-xl font-semibold flex flex-col gap-1">
          <span>💬 Chat Room</span>
          <span className="text-sm">Your ID: {myId}</span>
          <span className="text-sm">Room: {roomId || "Not joined"}</span>
        </div>

        {/* Join Room */}
        <div className="p-4 border-b flex gap-2 bg-blue-50">
          <input
            type="text"
            placeholder="Enter Room ID"
            className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={inputRoomId}
            onChange={(e) => setInputRoomId(e.target.value)}
          />
          <button
            onClick={joinRoom}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm"
          >
            Join
          </button>
        </div>

        {/* Messages */}
        <div className="h-[50vh] overflow-y-auto px-4 py-3 space-y-2 bg-slate-50">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.self ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-4 py-2 rounded-xl max-w-xs text-sm shadow-md ${
                  msg.self
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-gray-200 text-gray-800 rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={bottomRef}></div>
        </div>

        {/* Input */}
        <div className="border-t p-3 bg-white flex gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
            value={newMsg}
            onChange={(e) => setNewMsg(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition text-sm"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
