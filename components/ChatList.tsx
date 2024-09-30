
'use client';
import { useState, useEffect } from 'react';
import { useChat } from '@/context/ChatContext';
import { ChatUser } from '@/context/ChatContext';

const ChatList: React.FC = () => {
    const [query, setQuery] = useState('');
    const {setUser}= useChat();
    const [chatList, setChatList] = useState<ChatUser[]>([]);
    const { loginUser } = useChat();

  // Fetch the chat list for the logged-in user
  useEffect(() => {
    if (loginUser) {
      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const currentUser = storedUsers.find((user: { id: string }) => user.id === loginUser.id);
      
      if (currentUser && currentUser.chatList) {
        setChatList(currentUser.chatList); // Set chat list for the logged-in user
      }
    }
  }, [loginUser]);

  // Filter chatList based on the search query
  const filteredChatList = chatList.filter((chatUser) => 
    chatUser.name.toLowerCase()
  );

    function handleStartChat(chatUser: ChatUser){
        setUser(chatUser);
    }

  return (
    <>
        {/* Display User Chat List */}
        <div className="mt-6">
          {filteredChatList.length > 0 ? (
            filteredChatList.map((chatUser) => (
               <div className=" flex justify-between  items-center "> 
                <div key={chatUser.id} className="p-2 text-black border-b">
                    {chatUser.name}
                
                </div>
                <button 
                  onClick={() => handleStartChat(chatUser)}
                  className="bg-gray-400 text-white px-2  py-1 rounded-md hover:bg-black">
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
