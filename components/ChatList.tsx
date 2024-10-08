"use client";
import { useState, useEffect } from "react";
import { useChat } from "@/context/ChatContext";
import { ChatUser } from "@/context/ChatContext";

const ChatList: React.FC = () => {
  const { setUser } = useChat();
  const [chatList, setChatList] = useState<ChatUser[]>([]);
  const { loginUser } = useChat();

  useEffect(() => {
    if (loginUser) {
      const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
      const currentUser = storedUsers.find((user: { id: string }) => user.id === loginUser.id);

      if (currentUser && currentUser.chatList) {
        setChatList(currentUser.chatList);
      }
    }
  }, [loginUser]);

  function handleStartChat(chatUser: ChatUser) {
    setUser(chatUser);
  }

  return (
    <>
      {/* Display User Chat List */}
      <div className="mt-6 ">
        {chatList.length > 0 ? (
          chatList
            .filter((chatUser) => chatUser.name && chatUser.name.trim() !== "") // Check if name exists and is not blank
            .map((chatUser) => (
              <div key={chatUser.id} className="flex justify-between items-center border-b-2">
                <div className="p-2 text-black ">{chatUser.name}</div>
                <button
                  onClick={() => handleStartChat(chatUser)}
                  className="bg-black text-white px-2 py-1 rounded-md hover:bg-gray-600 hover:text-black"
                >
                  Start Chat
                </button>
              </div>
            ))
        ) : (
          <div className="text-gray-500">No chats found</div>
        )}
      </div>
    </>
  );
};

export default ChatList;
