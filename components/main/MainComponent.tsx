'use client';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea"; // Import the TextArea component
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState } from "react";
import { Smile, Send } from "lucide-react"; // Icons from lucide-react

interface Members {
    name: string;
    image: string;
}

const members: Members[] = [
  { name: "Diana Taylor", image: "/avatars/diana.png" },
  { name: "Daniel Anderson", image: "/avatars/daniel.png" },
];

export default function ChatComponent() {
  const [message, setMessage] = useState("");
  const [mentionOptions, setMentionOptions] = useState<Members[]>([]);
  const [showMentionBox, setShowMentionBox] = useState(false);

  const handleInputChange = (e: { target: { value: string; }; }) => {
    const value = e.target.value;
    setMessage(value);

    if (value.includes("@")) {
      setMentionOptions(members);
      setShowMentionBox(true);
    } else {
      setShowMentionBox(false);
    }
  };

  const handleMentionClick = (member: Members) => {
    setMessage((prev) => prev.replace(/@\w*$/, `@${member.name} `));
    setShowMentionBox(false);
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen p-3">
      {/* Messages */}
      <div className="flex-1 mb-4 p-4 w-full bg-white rounded-lg overflow-y-auto">
        <div className="space-y-4">
          <div className="flex space-x-2">
            <Avatar className="w-10 h-10 bg-gray-400">
              <AvatarImage src="/avatars/diana.png" />
              <AvatarFallback>D</AvatarFallback>
            </Avatar>
            <div>
              <p>
                <span className="font-semibold">@Diana T.</span> I have already prepared all styles according to the design phase.
              </p>
              <div className="flex space-x-2 mt-1">
                <span>❤️</span> <span>👍</span>
              </div>
            </div>
          </div>

          <div className="flex space-x-2">
            <Avatar className="w-10 h-10">
              <AvatarImage src="/avatars/daniel.png" />
              <AvatarFallback>D</AvatarFallback>
            </Avatar>
            <div>
              <p>
                <span className="font-semibold">@Daniel A.</span> Okay, keep me updated.
              </p>
              <div className="flex space-x-2 mt-1">
                <span>💪</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Input Box */}
      <div className="relative w-3/4 flex flex-row justify-center bg-gray-300 rounded-md">
        <Textarea
          value={message}
          onChange={handleInputChange}
          placeholder="Type your message..."
          className="pr-16 w-full bg-white md:w-5/6" // Full width and adjusted for larger screens
          rows={2} // Set the number of rows for the TextArea
        />
        <div className="flex items-center w-fit">
          {/* Emoji Picker */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon">
                <Smile className="h-5 w-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              {/* Emoji Picker logic (can be a third-party library) */}
              <div className="p-1">😊 😎 👍 ❤️</div>
            </PopoverContent>
          </Popover>
          {/* Send Button */}
          <Button variant="ghost" size="icon" onClick={() => alert("Message sent!")}>
            <Send className="h-5 w-5" />
          </Button>
        </div>

        {/* Mention Box */}
        {showMentionBox && (
          <div className="absolute bottom-12 left-0 w-full bg-white border shadow-lg rounded-md p-2 z-10">
            {mentionOptions.map((member) => (
              <div
                key={member.name}
                className="flex items-center p-2 cursor-pointer hover:bg-gray-200"
                onClick={() => handleMentionClick(member)}
              >
                <Avatar className="w-6 h-6">
                  <AvatarImage src={member.image} />
                  <AvatarFallback>{member.name[0]}</AvatarFallback>
                </Avatar>
                <span className="ml-2">{member.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
