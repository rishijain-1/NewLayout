'use client'
import React, { createContext, useContext, useState } from 'react';

export interface ChatUser {
  id: string;
  name: string;
  email: string;
}
export interface LoginUser {
  name: string;
  designation?: string;
  email: string;
  id: string;
}
export interface ChatContextProps {
  user: ChatUser | null;
  setUser: (user: ChatUser) => void;
  loginUser: LoginUser | null;
  setLoginUser: (user: LoginUser) => void;
  removeUser: () => void; 
  removeLoginUser: () => void
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<ChatUser | null>(null);
  const [loginUser, setLoginUser] = useState<LoginUser|null>(null)

  const removeUser = () => {
    setUser(null); 
    
  };
  const removeLoginUser=() => {
    setLoginUser(null)
  }

  return (
    <ChatContext.Provider value={{ user, setUser, removeUser,loginUser,setLoginUser,removeLoginUser }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};