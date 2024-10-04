"use client";
import { useState, useEffect } from "react";
import { useChat } from "@/context/ChatContext";
import { ChatUser } from "@/context/ChatContext";

const GroupList: React.FC = () => {
  const { setUser } = useChat();
  const [chatList, setChatList] = useState<ChatUser[]>([]);
  const { loginUser } = useChat();

  useEffect(() => {
    if (loginUser) {
      const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
      const currentUser = storedUsers.find((user: { id: string }) => user.id === loginUser.id);

      if (currentUser && currentUser.groupList) {
        setChatList(currentUser.groupList);
      }
    }
  }, [loginUser]);

  function handleStartChat(group: ChatUser) {
    setUser(group);
  }

  return (
    <>
      {/* Display User Chat List */}
      <div className="mt-2 w-full">
        {chatList.length > 0 ? (
          chatList
            .filter((group) => group.name && group.name.trim() !== "")
            .map((group) => (
              <div key={group.id} className="flex justify-between items-center">
                <div className="p-2 text-black border-b">{group.name}</div>
                <button
                  onClick={() => handleStartChat(group)}
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

export default GroupList;
