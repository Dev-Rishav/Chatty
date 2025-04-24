import { DocumentTextIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { Chat } from "../../interfaces/types";

interface Props {
  allChats: Chat[] | undefined;
  selectedChatId: number | null;
  setSelectedChatId: (id: number) => void;
  onlineUsersArray: string[];
}

const ChatList: React.FC<Props> = ({
  allChats,
  selectedChatId,
  setSelectedChatId,
  onlineUsersArray,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredChats = allChats?.filter(chat =>
    chat.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.lastMessage?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search conversations.."
          className="paper-input pl-12 pr-4 py-3 font-crimson"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <MagnifyingGlassIcon className="absolute right-12 top-3.5 w-5 h-5 text-amber-700/80" />
        <DocumentTextIcon className="absolute right-4 top-3.5 w-5 h-5 text-amber-700/80" />
      </div>

      <div className="flex-1 overflow-y-auto space-y-2">
        {filteredChats && filteredChats.length > 0 ? (
          filteredChats.map((chat) => (
            <div
              key={chat.id}
              className={`paper-card hover:bg-amber-50 transition-all cursor-pointer p-4 ${
                selectedChatId === chat.id ? "bg-amber-100" : ""
              }`}
              onClick={() => setSelectedChatId(chat.id)}
            >
              <div className="flex items-center">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-amber-100 border-2 border-amber-200 flex items-center justify-center">
                    {chat.profilePic ? (
                      <img
                        src={chat.profilePic}
                        alt="Profile"
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <span className="text-amber-700 text-xl">📬</span>
                    )}
                  </div>
                  {onlineUsersArray.includes(chat.email) && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-600 rounded-full border-2 border-amber-100" />
                  )}
                </div>
                <div className="ml-4 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-lg font-playfair text-amber-900">
                      {chat.username}
                    </p>
                    <span className="text-sm text-amber-700/80">
                      {new Date(chat.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-sm text-amber-700/80 mt-1 line-clamp-1">
                    {chat.lastMessage}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="paper-card bg-amber-50 p-8 text-center">
            <span className="text-4xl">📭</span>
            <h3 className="mt-4 font-playfair text-xl text-amber-900">
              No Conversations Found
            </h3>
            <p className="mt-2 font-crimson text-amber-700/80">
              {searchQuery ? 
                `Add "${searchQuery}" to your contacts to start a conversation` : 
                "Start a new conversation using the + button"
              }
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default ChatList;