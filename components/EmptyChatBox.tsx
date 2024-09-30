import React from 'react';
import { ChatBubbleLeftIcon } from '@heroicons/react/24/outline';

const EmptyChatBox = () => {
  return (
    <div className="flex flex-col items-center justify-center ">
      <ChatBubbleLeftIcon className="w-24 h-24 text-gray-500 mb-4" />
      <div className="text-gray-500 text-5xl font-bold">GetChat</div>
    </div>
  );
};

export default EmptyChatBox;
