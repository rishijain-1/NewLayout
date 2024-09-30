'use client';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';
import { getCurrentUser } from '@/app/api/auth/session';
import { ChatUser, useChat } from '@/context/ChatContext';
import ChatList from './ChatList';

const NewChat: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<ChatUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { setUser } = useChat();
  const {loginUser}=useChat();
  const lastQueryRef = useRef<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // User search function
  const searchUsers = async (searchQuery: string): Promise<void> => {
    if (searchQuery.length < 2 || searchQuery === lastQueryRef.current) {
      setResults([]);
      return;
    }

    lastQueryRef.current = searchQuery; // Update the last query reference
    setLoading(true);
    setError(null);

    try {
      const session = await getCurrentUser();
      const token = session?.accessToken;

      if (!token) {
        setError('Access token is missing');
        setLoading(false);
        return;
      }

      const response = await axios.get<{ user: ChatUser[] }>('/api/search', {
        params: { query: searchQuery },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setResults(response.data.user);
    } catch (error ) {
       if(error){
        setError('failed t fetch user')
       }
    } finally {
      setLoading(false);
    }
  };

  // Debounced search effect
  useEffect(() => {
    if (query.length >= 2) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        searchUsers(query);
      }, 300);
    } else {
      setResults([]);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [query]);

  // Start chat function
  const handleStartChat = (newChatUser: ChatUser): void => {
    
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
  
    const loggedInUserIndex = existingUsers.findIndex((user: { id: string }) => user.id === loginUser?.id);
  
    if (loggedInUserIndex !== -1) {
      const loggedInUser = existingUsers[loggedInUserIndex];
  

      if (!loggedInUser.chatList) {
        loggedInUser.chatList = [];
      }
  
     
      const chatExists = loggedInUser.chatList.some((chatUser: ChatUser) => chatUser.id === newChatUser.id);
  
      if (!chatExists) {
       
        loggedInUser.chatList.push(newChatUser);
  
        existingUsers[loggedInUserIndex] = loggedInUser;
        localStorage.setItem('users', JSON.stringify(existingUsers));
  
        alert('Chat started and saved to localStorage.');
      } else {
        alert('Chat already exists in chatList.');
      }
    } else {
      alert('Logged-in user not found in localStorage.');
    }
  
    setUser(newChatUser);
    setQuery('');

  };
  
  

  return (
   
      
    <div>
        <div className="flex items-center space-x-2 mb-6 w-full sm:max-w-lg mx-auto">
          <input
            type="text"
            placeholder="Search for users"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-600 w-full"
          />
          <FaSearch className="text-gray-500 w-4 h-4 sm:w-6 sm:h-6 cursor-pointer" />
        </div>

        {loading && <p className="text-gray-500 text-center">Searching...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="space-y-4">
          {results.length > 0 ? (
            results.map((user: ChatUser) => (
              <div key={user.id} className="flex flex-col sm:flex-row items-center p-3 border rounded-md">
                <div className="flex-grow text-center mb-2 sm:mb-0 sm:mr-4">
                  <p className="font-semibold text-lg">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                  <button 
                  onClick={() => handleStartChat(user)}
                  className="bg-gray-600 text-sm text-white w-3/4 px-3 py-1 mt-2 rounded-md hover:bg-black">
                  Start Chat
                </button>
                </div>
                
              </div>
            ))
          ) : (
            !loading && <div className="text-gray-500 text-center"><ChatList/></div>
          )}
        </div>
    </div>
  );
};

export default NewChat;