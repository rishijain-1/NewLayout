"use client";
import React, { useState, useEffect } from "react";
import { FaPaperPlane } from "react-icons/fa";
import ChatHeader from "./ChatHeader";
import { useChat } from "@/context/ChatContext";
import EmptyChatBox from "./EmptyChatBox";
import { getCurrentUser } from "@/app/api/auth/session";

interface Message {
  id: number;
  text: string;
  receiver: string;
  time: string;
}
interface ApiResponse {
  data: {
    id: number;
    message: string;
    receiver_id: string;
    created_at: string;
  }[];
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const { user } = useChat();
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch messages when the component mounts
  useEffect(() => {
    const fetchMessages = async () => {
      const session = await getCurrentUser();
      const token = session?.accessToken;

      if (!token) {
        alert("Please login");
        return;
      }
      if (!user) return;

      const user_id = user.id;
      console.log(user.id);
      try {
        const response = await fetch(
          `https://cjxiaojia.com/api/en/message/${user_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch messages");
        }

        const data: ApiResponse = await response.json();
        const formattedMessages = data.data.map((message) => {
          const time = new Date(message.created_at);
          return {
            id: message.id,
            text: message.message,
            receiver: message.receiver_id === user_id ? "receiver" : "You",
            time: `${time.getHours()}:${
              time.getMinutes() < 10 ? "0" : ""
            }${time.getMinutes()}`,
          };
        });

        // Sort messages by time
        formattedMessages.sort((a: { time: string }, b: { time: string }) => {
          const timeA = a.time.split(":").map(Number);
          const timeB = b.time.split(":").map(Number);
          return timeA[0] * 60 + timeA[1] - (timeB[0] * 60 + timeB[1]);
        });
        setMessages(formattedMessages);
      } catch (error) {
        console.error("Error fetching messages:", error);
        alert("Failed to load messages. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [user]);

  const handleSendMessage = async () => {
    if (inputMessage.trim() === "") return;
    const session = await getCurrentUser();
    const token = session?.accessToken;

    if (!token) {
      alert("Please login");
      return;
    }

    const newMessage: Message = {
      id: Date.now(),
      text: inputMessage,
      receiver: "receiver",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputMessage("");

    try {
      const response = await fetch("/api/sendMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          message: inputMessage,
          receiver_id: user?.id,
          type: "individual",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again.");
    }
  };

  if (!user) {
    return (
      <div className="flex h-full justify-center">
        <EmptyChatBox />
      </div>
    );
  }

  if (loading) {
    return <div className="text-center">Loading messages...</div>;
  }

  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-full h-full rounded-t-lg shadow-lg flex flex-col">
        <div className="p-4 text-black text-lg font-bold ">
          <ChatHeader name={user.name} />
        </div>

        <div className="flex-1 px-6 py-4 overflow-y-auto overflow-x-hidden">
          {messages.length === 0 ? (
            <p className="text-center text-gray-500">No messages yet</p>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 ${
                  message.receiver === "receiver" ? "text-right" : "text-left"
                }`}
              >
                <div
                  className={`inline-block px-4 py-2 rounded-lg ${
                    message.receiver === "receiver"
                      ? "bg-gray-300 text-black"
                      : "bg-indigo-500 text-white"
                  } max-w-[70%] w-auto`}
                >
                  <div
                    className="text-left"
                    style={{
                      wordBreak: "break-word",
                      maxWidth: "500px",
                      width: "auto",
                    }}
                  >
                    {message.text}
                  </div>
                </div>
                <div
                  className={`text-xs ${
                    message.receiver === "receiver" ? "text-right" : "text-left"
                  } text-gray-500`}
                >
                  {message.time}
                </div>
              </div>
            ))
          )}
        </div>

        <div className=" flex items-center justify-center ">
          <div className="p-2  mb-4 w-3/4 items-center flex rounded-md">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type a message"
              rows={2}
              className="flex-grow p-2  border  shadow-lg border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
            />
            <button
              onClick={handleSendMessage}
              className="ml-4 p-3  bg-gray-600 text-white rounded-full hover:bg-black"
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
