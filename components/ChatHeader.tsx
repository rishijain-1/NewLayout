'use client';
import React from 'react';
import { FaUserCircle, FaChevronRight } from 'react-icons/fa';
import { useChat } from '@/context/ChatContext'; 

interface ChatHeaderProps {
  name: string;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ name }) => {
  const { removeUser } = useChat(); 

  const handleNavigate = () => {
    removeUser();
  };

  return (
    <div className="flex items-center justify-between p-1 shadow-xl">
      {/* Left Side: User Icon and Username */}
      <div className="flex items-center space-x-2">
        <FaUserCircle className="text-3xl" />
        <span className="text-lg font-semibold">{name}</span>
      </div>

      {/* Right Side: Right Arrow Icon */}
      <FaChevronRight 
        className="text-xl cursor-pointer hover:text-gray-200" 
        onClick={handleNavigate} 
      />
    </div>
  );
};

export default ChatHeader;