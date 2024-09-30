'use client';
import { useState, useEffect } from 'react';
import { useChat } from '@/context/ChatContext';
import { ChatUser } from '@/context/ChatContext';

const ChatList: React.FC = () => { 
  const { setUser } = useChat();
  const [chatList, setChatList] = useState<ChatUser[]>([]);
  const { loginUser } = useChat();

  useEffect(() => {
    if (loginUser) {
      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
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
      <div className="mt-6">
        {chatList.length > 0 ? (
          chatList.map((chatUser) => (
            <div key={chatUser.id} className="flex justify-between items-center"> 
              <div className="p-2 text-black border-b">
                {chatUser.name}
              </div>
              <button
                onClick={() => handleStartChat(chatUser)}
                className="bg-gray-400 text-white px-2 py-1 rounded-md hover:bg-black"
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
