import React from 'react'
import { Chat } from '../../interfaces/types';
import { LockClosedIcon, PuzzlePieceIcon } from '@heroicons/react/24/outline';

const ChatHeader = ({ chat }: { chat: Chat }) => (
    <div className="bg-amber-50 p-6 border-b border-amber-200 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 rounded-full bg-amber-100 border-2 border-amber-200 flex items-center justify-center">
          <span className="text-amber-700 text-xl">📨</span>
        </div>
        <div>
          <h2 className="text-2xl tracking-wide font-playfair text-amber-900">
            {chat.username}
          </h2>
          <p className="text-sm text-amber-700/80 flex items-center">
            <LockClosedIcon className="w-4 h-4 mr-2" />
            Secured with wax seal
          </p>
        </div>
      </div>
      {/* gamification */}
      <button className="paper-button">
        <PuzzlePieceIcon className="w-6 h-6 text-amber-700" />
      </button>
    </div>
  );

export default ChatHeader